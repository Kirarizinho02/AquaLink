/* eslint-disable @typescript-eslint/no-explicit-any */

import { Droplet, Bell, GlassWater, ChartArea, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { auth, db } from "@/config/firebase";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/ui/kibo-ui/theme-switcher";
import { usePageTitle } from "@/hooks";
import { format, subDays, isAfter } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { aqualink_classic } from "@/assets";

const PERIODS = [
  { label: "Últimas 24h", value: 1 },
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 30 dias", value: 30 },
];

const BOTTLE_ID = "12345678-1234-1234-1234-1234567890ab"; // Troque pelo id real

const Dashboard = () => {
  usePageTitle("Dashboard | AquaLink");

  const [user, setUser] = useState<{
    displayName?: string;
    email?: string;
  } | null>(null);
  const [period, setPeriod] = useState(30);
  const [readings, setReadings] = useState<any[]>([]);
  const [totalIngerido, setTotalIngerido] = useState(0);
  const [bottleInfo, setBottleInfo] = useState<any>(null);
  const [reminders, setReminders] = useState<any[]>([]);
  const [showReminderModal, setShowReminderModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName ?? "Usuário",
          email: firebaseUser.email ?? "Email não disponível",
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Buscar leituras da garrafa
  useEffect(() => {
    const startDate = subDays(new Date(), period - 1);
    const readingsRef = ref(db, `bottles/${BOTTLE_ID}/readings`);
    return onValue(readingsRef, (snapshot) => {
      const data = snapshot.val() || {};
      // Filtra por período
      const filtered = Object.values(data)
        .filter(
          (r: any) =>
            r &&
            typeof r === "object" &&
            r.timestamp &&
            isAfter(new Date(r.timestamp), startDate)
        )
        .sort((a: any, b: any) => a.timestamp - b.timestamp);
      setReadings(filtered);

      if (data.consumoAcumulado) {
        // Pega todas as datas ordenadas
        const allDays = Object.keys(data.consumoAcumulado).sort();
        // Define o início e o fim do período
        const startDateObj = subDays(new Date(), period - 1);
        const startDateStr = format(startDateObj, "yyyy-MM-dd");
        const endDateStr = format(new Date(), "yyyy-MM-dd");

        // Filtra os dias dentro do período
        const daysInPeriod = allDays.filter(
          (d) => d >= startDateStr && d <= endDateStr
        );

        if (daysInPeriod.length === 0) {
          setTotalIngerido(0);
          return;
        }

        // Soma todos os valores acumulados dos dias do período
        const soma = daysInPeriod.reduce(
          (acc, day) => acc + (Number(data.consumoAcumulado[day]) || 0),
          0
        );

        setTotalIngerido(soma);
        return;
      }

      if (filtered.length > 1) {
        const first = filtered[0] as {
          consumoAcumulado?: number;
          consumo?: number;
        };
        const last = filtered[filtered.length - 1] as {
          consumoAcumulado?: number;
          consumo?: number;
        };
        const firstAcumulado = Number(first.consumoAcumulado) || 0;
        const firstConsumo = Number(first.consumo) || 0;
        const lastAcumulado = Number(last.consumoAcumulado) || 0;
        setTotalIngerido(lastAcumulado - (firstAcumulado - firstConsumo));
      } else if (filtered.length === 1) {
        const only = filtered[0] as { consumo?: number };
        setTotalIngerido(Number(only.consumo) || 0);
      } else {
        setTotalIngerido(0);
      }
    });
  }, [period]);
  // Buscar info da garrafa
  useEffect(() => {
    const bottleRef = ref(db, `bottles/${BOTTLE_ID}/info`);
    return onValue(bottleRef, (snapshot) => {
      setBottleInfo(snapshot.val());
    });
  }, []);

  // Buscar lembretes
  useEffect(() => {
    const remindersRef = ref(db, `bottles/${BOTTLE_ID}/reminders`);
    return onValue(remindersRef, (snapshot) => {
      setReminders(snapshot.val() ? Object.values(snapshot.val()) : []);
    });
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Você não está logado.</p>
      </div>
    );
  }

  // Dados para o gráfico
  const chartData = (() => {
    if (period === 30) {
      // Agrupa em semanas
      const startDate = subDays(new Date(), 29);
      const weeks = [[], [], [], []] as any[][];
      readings.forEach((r: any) => {
        const dayIndex = Math.floor(
          (new Date(r.timestamp).getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        const weekIndex = Math.min(Math.floor(dayIndex / 7), 3);
        if (weekIndex >= 0 && weekIndex < 4) weeks[weekIndex].push(r);
      });
      return weeks.map((week, i) => {
        const desempenho =
          week.reduce((sum: number, r: any) => sum + r.consumo, 0) / 1000;
        const meta = 2000 * 7; // 2000ml/dia * 7 dias
        return {
          semana: `Semana ${i + 1}`,
          Meta: Number((meta / 1000).toFixed(1)),
          Desempenho: Number(desempenho.toFixed(1)),
        };
      });
    } else {
      // Agrupa por dia
      const days = [];
      for (let i = period - 1; i >= 0; i--) {
        const d = subDays(new Date(), i);
        days.push(format(d, "dd/MM"));
      }
      const dataByDay: Record<string, { meta: number; desempenho: number }> =
        {};
      days.forEach((d) => (dataByDay[d] = { meta: 2000, desempenho: 0 }));

      readings.forEach((r: any) => {
        const day = format(new Date(r.timestamp), "dd/MM");
        if (dataByDay[day]) {
          dataByDay[day].desempenho += r.consumo;
        }
      });

      return days.map((d) => ({
        dia: d,
        Meta: Number((dataByDay[d].meta / 1000).toFixed(1)),
        Desempenho: Number(((dataByDay[d].desempenho || 0) / 1000).toFixed(1)),
      }));
    }
  })();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Visão Geral</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto me-4">
            <ThemeSwitcher />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Filtros */}
          <div className="flex gap-2 mb-2">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                className={`px-3 py-1 rounded-full border hover:bg-muted/30 transition-all duration-200 cursor-pointer ${
                  period === p.value
                    ? "bg-azul-primario text-white"
                    : "bg-white dark:bg-muted/50 dark:text-azul-quintenario text-azul-primario"
                }`}
                onClick={() => setPeriod(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
          {/* Cards */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 max-h-full">
            {/* Total ingerido */}
            <div className="bg-muted/50 rounded-xl flex flex-col justify-start items-stretch p-4 h-full">
              <div className="flex items-center mb-2">
                <span
                  className="inline-flex items-center justify-center rounded-full bg-[#E4E4E4] dark:bg-gray-700"
                  style={{ width: 32, height: 32 }}
                >
                  <Droplet
                    className="text-azul-primario dark:text-azul-quintenario"
                    size={18}
                  />
                </span>
                <span className="ml-3 text-lg font-semibold text-azul-primario dark:text-azul-quintenario font-poppins">
                  Total ingerido
                </span>
              </div>
              <span className="text-3xl font-bold">
                {(totalIngerido / 1000).toFixed(2)} L
              </span>
              <span className="text-xs text-gray-500">
                no período selecionado
              </span>
            </div>
            {/* Lembretes */}
            <div className="bg-muted/50 rounded-xl flex flex-col justify-start items-stretch p-4 max-h-full">
              <div className="flex items-center mb-2">
                <span
                  className="inline-flex items-center justify-center rounded-full bg-[#E4E4E4] dark:bg-gray-700"
                  style={{ width: 32, height: 32 }}
                >
                  <Bell
                    className="text-azul-primario dark:text-azul-quintenario"
                    size={18}
                  />
                </span>
                <span className="ml-3 text-lg font-semibold text-azul-primario dark:text-azul-quintenario font-poppins">
                  Lembretes
                </span>
              </div>
              {reminders.length === 0 ? (
                <span className="text-gray-500 flex-1 place-items-center">
                  Nenhum lembrete cadastrado
                </span>
              ) : (
                (() => {
                  const now = new Date();
                  const currentMinutes = now.getHours() * 60 + now.getMinutes();

                  const remindersWithTime = reminders
                    .filter(
                      (r: any) => r?.horario && /^\d{2}:\d{2}$/.test(r.horario)
                    )
                    .map((r: any) => {
                      const [h, m] = r.horario.split(":").map(Number);
                      return { ...r, minutes: h * 60 + m };
                    })
                    .sort((a: any, b: any) => a.minutes - b.minutes);

                  let next = remindersWithTime.find(
                    (r: any) => r.minutes > currentMinutes
                  );
                  if (!next && remindersWithTime.length > 0)
                    next = remindersWithTime[0];

                  const others = remindersWithTime.filter(
                    (r: any) => r !== next
                  );

                  return (
                    <div className="flex-1 flex flex-col">
                      {/* Centro: próximo lembrete */}
                      <div className="flex-1 grid place-items-center">
                        <div className="text-start w-full">
                          <span className="font-bold text-black dark:text-white text-2xl md:text-4xl font-lato">
                            Próximo Lembrete:
                          </span>
                          <span className="ml-2 font-regular text-2xl md:text-4xl">
                            {next ? next.horario : "--:--"}
                          </span>
                        </div>
                      </div>
                      {/* Fundo: outros lembretes */}
                      {others.length > 0 && (
                        <div className="pt-2 flex flex-col gap-2">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Outros lembretes:
                          </span>
                          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                            {others.map((r: any, i: number) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-azul-primario dark:bg-azul-quaternario" />
                                <span>{r.horario}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            className="mt-2 self-end flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
                            onClick={() => setShowReminderModal(true)}
                            title="Adicionar lembrete"
                          >
                            <Plus size={18} />
                            Novo lembrete
                          </button>
                          {/* Modal */}
                          {showReminderModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg min-w-[300px]">
                                <div className="flex justify-between items-center mb-4">
                                  <h2 className="text-lg font-bold">
                                    Adicionar Lembrete
                                  </h2>
                                  <button
                                    className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                                    onClick={() => setShowReminderModal(false)}
                                  >
                                    ×
                                  </button>
                                </div>
                                {/* Formulário simples para adicionar lembrete */}
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;
                                    const horario = (
                                      form.elements.namedItem(
                                        "horario"
                                      ) as HTMLInputElement
                                    ).value;
                                    if (horario) {
                                      // Salvar no Firebase
                                      const remindersRef = ref(
                                        db,
                                        `bottles/${BOTTLE_ID}/reminders`
                                      );
                                      const newReminder = { horario };
                                      // push para adicionar novo lembrete
                                      import("firebase/database").then(
                                        ({ push }) => {
                                          push(remindersRef, newReminder);
                                          setShowReminderModal(false);
                                        }
                                      );
                                    }
                                  }}
                                >
                                  <label className="block mb-2 text-sm font-medium">
                                    Horário
                                    <input
                                      type="time"
                                      name="horario"
                                      required
                                      className="block w-full mt-1 rounded border px-2 py-1"
                                    />
                                  </label>
                                  <div className="flex justify-end mt-4">
                                    <button
                                      type="button"
                                      className="mr-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                                      onClick={() =>
                                        setShowReminderModal(false)
                                      }
                                    >
                                      Cancelar
                                    </button>
                                    <button
                                      type="submit"
                                      className="px-3 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-600"
                                    >
                                      Salvar
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
            {/* Sua garrafa */}
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col justify-start items-stretch p-4">
              <div className="flex items-center mb-2 ">
                <span
                  className="inline-flex items-center justify-center rounded-full bg-[#E4E4E4] dark:bg-gray-700"
                  style={{ width: 32, height: 32 }}
                >
                  <GlassWater
                    className="text-azul-primario dark:text-azul-quintenario"
                    size={18}
                  />
                </span>
                <span className="ml-3 text-lg font-semibold text-azul-primario font-poppins dark:text-azul-quintenario">
                  Sua Garrafa
                </span>
              </div>
              <div className="flex flex-1 gap-4 ">
                {/* Esquerda */}
                <div className="flex flex-col items-center w-1/2 border-e-2 h-full flex-1">
                  {bottleInfo ? (
                    <div className="flex flex-col items-center h-full flex-1 ">
                      <span className="font-regular text-azul-primario dark:text-azul-quintenario font-lato">
                        AquaLink Classic
                      </span>
                      <img
                        src={aqualink_classic}
                        alt="Garrafa"
                        className="max-h-full my-2"
                      />
                      <span className="text-xs text-gray-500">
                    Cadastrada em{" "}
                    {bottleInfo?.dataCadastro
                      ? format(new Date(bottleInfo.dataCadastro), "dd/MM/yyyy")
                      : "--/--/----"}
                  </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center h-full  my-auto">
                      <div className="w-16 h-16 my-2 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 ">
                        <GlassWater size={32} />
                      </div>
                      <span className="text-xs text-gray-500">
                    Cadastrada em{" "}
                    {bottleInfo?.dataCadastro
                      ? format(new Date(bottleInfo.dataCadastro), "dd/MM/yyyy")
                      : "--/--/----"}
                  </span>
                    </div>
                  )}
                  
                </div>
                {/* Direita */}
                <div className="flex flex-col justify-center w-1/2 gap-2">
                  <span className="text-sm">
                    Bateria: <b>{bottleInfo?.bateria ?? "--"}%</b>
                  </span>
                  <span className="text-sm">
                    Água: <b>{bottleInfo?.agua ?? "--"} ml</b>
                  </span>
                  <span className="text-sm">
                    Status:{" "}
                    <b
                      className={
                        bottleInfo?.conectado === undefined
                          ? "text-gray-400"
                          : bottleInfo?.conectado
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {bottleInfo?.conectado === undefined
                        ? "--"
                        : bottleInfo?.conectado
                        ? "Conectado"
                        : "Desconectado"}
                    </b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Relatório de hidratação */}
          <div className="bg-muted/50 min-h-[300px] flex-1 rounded-xl md:min-h-min p-4 flex flex-col">
            <div className="flex items-center mb-4 ">
              <span
                className="inline-flex items-center justify-center rounded-full bg-[#E4E4E4] dark:bg-gray-700"
                style={{ width: 32, height: 32 }}
              >
                <ChartArea
                  className="text-azul-primario dark:text-azul-quintenario"
                  size={18}
                />
              </span>
              <span className="ml-3 text-lg font-semibold text-azul-primario font-poppins dark:text-azul-quintenario">
                Relatório de Hidratação
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                {period === 30 ? (
                  <XAxis dataKey="semana" />
                ) : (
                  <XAxis dataKey="dia" />
                )}
                <YAxis domain={[0, period === 30 ? 20 : "auto"]} unit="L" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Meta" fill="#29ebd5" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="Desempenho"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Dashboard };
