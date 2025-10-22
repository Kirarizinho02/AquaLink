/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeft, ArrowRight, CalendarIcon, CheckCircle2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { logo_no_writing_aqualink_primary, water_bar } from "@/assets";
import { useNavigate } from "react-router-dom";
import { useAuthContext, usePageTitle, usePasswordStrength } from "@/hooks";
import { LoginAlerts } from "@/components";

const MIN_HEIGHT_CM = 5;
const MAX_HEIGHT_CM = 300;
const MIN_WEIGHT_KG = 5;
const MAX_WEIGHT_KG = 600;

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}
function maskHeightCm(value: string) {
  return onlyDigits(value).slice(0, 3);
}
function clampHeight(heightStr: string) {
  if (!heightStr) return "";
  const n = parseInt(heightStr, 10);
  if (isNaN(n)) return "";
  return String(Math.min(MAX_HEIGHT_CM, Math.max(MIN_HEIGHT_CM, n)));
}
function maskWeightKg(value: string) {
  return onlyDigits(value).slice(0, 3);
}
function clampWeight(weightStr: string) {
  if (!weightStr) return "";
  const n = parseInt(weightStr, 10);
  if (isNaN(n)) return "";
  return String(Math.min(MAX_WEIGHT_KG, Math.max(MIN_WEIGHT_KG, n)));
}
function formatDateBR(date: Date | undefined) {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
function parseDateBR(value: string): Date | undefined {
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return undefined;
  const day = Number(m[1]);
  const month = Number(m[2]) - 1;
  const year = Number(m[3]);
  const dt = new Date(year, month, day);
  if (dt.getFullYear() !== year || dt.getMonth() !== month || dt.getDate() !== day) return undefined;
  return dt;
}
function isReasonableBirthdate(date?: Date) {
  if (!date) return false;
  const today = new Date();
  const min = new Date(1900, 0, 1);
  if (date > today || date < min) return false;
  const age =
    today.getFullYear() -
    date.getFullYear() -
    (today < new Date(today.getFullYear(), date.getMonth(), date.getDate()) ? 1 : 0);
  return age >= 5 && age <= 120;
}

function DateInputBR({
  id,
  placeholder,
  required,
  value,
  onChange,
}: {
  id: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const parsed = parseDateBR(value);
  const [open, setOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<Date | undefined>(parsed ?? new Date("2005-01-01"));

  return (
    <div className="relative flex gap-2">
      <Input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v);
          const dt = parseDateBR(v);
          if (dt) setMonth(dt);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        required={required}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`${id}-picker`}
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            type="button"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Selecionar data</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={parsed}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            month={month}
            onMonthChange={setMonth}
            onSelect={(date) => {
              const valid = isReasonableBirthdate(date ?? undefined);
              const text = valid ? formatDateBR(date!) : value;
              onChange(text);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface FormData {
  [key: string]: any;
}
interface MultiStepFormProps {
  className?: string;
  onSubmit?: (data: FormData) => void;
}

const RegisterPage = ({ className }: MultiStepFormProps) => {
  usePageTitle("Cadastro | AquaLink");

  const { register: registerUser } = useAuthContext();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete] = useState(false);

  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
    details?: string[];
  } | null>(null);

  const password = formData.password ?? "";
  const passwordCheck = usePasswordStrength(password);

  const steps = [
    {
      id: "personal",
      title: "Informações Pessoais",
      description: "Conte-nos sobre você",
      fields: [
        { name: "firstName", label: "Nome", type: "text", placeholder: "João", required: true },
        { name: "lastName", label: "Sobrenome", type: "text", placeholder: "Silva", required: true },
        { name: "email", label: "E-mail", type: "email", placeholder: "joao.silva@exemplo.com", required: true },
      ],
    },
    {
      id: "address",
      title: "Informações Adicionais",
      description: "Nos conte mais sobre você.",
      fields: [
        { name: "height", label: "Altura (cm)", type: "text", placeholder: "177", required: true },
        { name: "weight", label: "Peso (kg)", type: "text", placeholder: "75", required: true },
        { name: "date", label: "Data de Nascimento", type: "date", placeholder: "21/08/2007", required: true },
        {
          name: "gender",
          label: "Gênero",
          type: "select",
          options: [
            { value: "masculino", label: "Masculino" },
            { value: "feminino", label: "Feminino" },
            { value: "nao-binario", label: "Não binário" },
            { value: "outro", label: "Outro" },
          ],
          placeholder: "Selecione seu gênero",
          required: true,
        },
      ],
    },
    {
      id: "account",
      title: "Configuração da Conta",
      description: "Crie sua conta",
      fields: [
        { name: "password", label: "Senha", type: "password", placeholder: "••••••••", required: true },
        { name: "confirmPassword", label: "Confirmar Senha", type: "password", placeholder: "••••••••", required: true },
      ],
    },
  ];

  const progress = ((step + 1) / steps.length) * 100;

  const handleNextStep = async (data: any) => {
    // valida obrigatórios do passo
    const currentFields = steps[step].fields;
    let hasError = false;
    const missingFields: string[] = [];

    for (const field of currentFields) {
      if (field.required) {
        const value = data[field.name] ?? formData[field.name] ?? "";
        if (typeof value === "string" ? value.trim() === "" : value === undefined || value === null) {
          hasError = true;
          missingFields.push(field.label);
        }
      }
    }
    if (hasError) {
      setAlert({ type: "error", message: "Preencha todos os campos obrigatórios.", details: missingFields });
      return;
    }

    // validações extras do passo "address"
    if (steps[step].id === "address") {
      const details: string[] = [];
      const h = Number((data.height ?? formData.height ?? "").toString());
      if (!Number.isFinite(h) || h < MIN_HEIGHT_CM || h > MAX_HEIGHT_CM) {
        details.push(`Altura deve estar entre ${MIN_HEIGHT_CM} e ${MAX_HEIGHT_CM} cm.`);
      }
      const w = Number((data.weight ?? formData.weight ?? "").toString());
      if (!Number.isFinite(w) || w < MIN_WEIGHT_KG || w > MAX_WEIGHT_KG) {
        details.push(`Peso deve estar entre ${MIN_WEIGHT_KG} e ${MAX_WEIGHT_KG} kg.`);
      }
      const dateStr = (data.date ?? formData.date ?? "") as string;
      const parsed = parseDateBR(dateStr);
      if (!isReasonableBirthdate(parsed)) {
        details.push("Data de nascimento inválida.");
      }
      if (details.length) {
        setAlert({ type: "error", message: "Revise suas informações.", details });
        return;
      }
    }

    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step === steps.length - 1) {
      if (passwordCheck.strength === "fraca") {
        setAlert({ type: "error", message: "A senha não atende aos requisitos:", details: passwordCheck.requirements });
        return;
      }
      if (updatedData.password !== updatedData.confirmPassword) {
        setAlert({ type: "error", message: "As senhas não coincidem." });
        return;
      }

      setIsSubmitting(true);
      setAlert(null);

      if (!updatedData.password) {
        setAlert({ type: "error", message: "Senha obrigatória." });
        setIsSubmitting(false);
        return;
      }
      if (!updatedData.email) {
        setAlert({ type: "error", message: "Email obrigatório." });
        setIsSubmitting(false);
        return;
      }

      try {
        await registerUser({
          email: updatedData.email,
          password: updatedData.password,
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          height: updatedData.height,
          weight: updatedData.weight,
          birthdate: updatedData.date,
          gender: updatedData.gender,
        });
        // redireciona assim que possível
        navigation("/dashboard", { replace: true });
        return;
      } catch (error: any) {
        setAlert({
          type: "error",
          message: "Erro ao criar usuário.",
          details: [error.message || "Tente novamente."],
        });
        setIsSubmitting(false);
      }
      return;
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const variants = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } };

  const STATE_MACHINE = "State Machine";
  const LEVEL_INPUT = "Level";

  const { rive, RiveComponent } = useRive({
    src: water_bar,
    autoplay: true,
    stateMachines: STATE_MACHINE,
    autoBind: true,
  });

  const levelInput = useStateMachineInput(rive, STATE_MACHINE, LEVEL_INPUT);
  const animationRef = useRef<number | null>(null);

  const animateLevel = (from: number, to: number, duration = 1000) => {
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      if (levelInput) levelInput.value = from + (to - from) * eased;
      if (progress < 1) animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!levelInput) return;
    let target = typeof levelInput.value === "number" ? levelInput.value : 0;
    if (step === 0) target = 2;
    else if (step === 1) target = 40;
    else if (step === 2) target = 100;
    const from = typeof levelInput.value === "number" ? levelInput.value : 0;
    animateLevel(from, target, 1200);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [step, levelInput]);

  const navigation = useNavigate();

  return (
    <div
      className="inset-0 w-full bg-[radial-gradient(var(--color-grid)_1px,transparent_1px)] 
      [background-size:16px_16px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_60%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_90%_60%_at_50%_50%,#000_80%,transparent_100%)]"
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:block mt-20">
          <RiveComponent style={{ width: "100%", height: "100%" }} />
        </div>
        {!isComplete ? (
          <div className={cn("w-[90%] md:w-[70%] lg:max-w-xl my-20 mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md", className)}>
            <div className="mb-4 flex justify-center">
              <a onClick={() => navigation("/")} className="cursor-pointer">
                <img src={logo_no_writing_aqualink_primary} alt="AquaLink Logo" className="max-w-[55px]" />
              </a>
            </div>

            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Passo {step + 1} de {steps.length}</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Indicadores de passo */}
            <div className="mb-8 flex justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                      i < step
                        ? "bg-azul-primario text-primary-foreground"
                        : i === step
                        ? "bg-azul-primario text-white ring-primary/30 ring-2"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {i < step ? <CheckCircle2 className="h-4 w-4 text-white" /> : i + 1}
                  </div>
                  <span className="mt-1 hidden text-xs sm:block">{s.title}</span>
                </div>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.div key={step} initial="hidden" animate="visible" exit="exit" variants={variants} transition={{ duration: 0.3 }}>
                <div className="mb-6">
                  <h2 className="text-xl font-bold ">{steps[step].title}</h2>
                  <p className="text-muted-foreground text-sm">{steps[step].description}</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data: any = {};
                    steps[step].fields.forEach((field) => {
                      data[field.name] = formData[field.name] ?? (e.currentTarget as any)[field.name]?.value ?? "";
                    });
                    handleNextStep(data);
                  }}
                  className="space-y-4"
                >
                  {steps[step].fields.map((field) => {
                    const commonLabel = <Label htmlFor={field.name}>{field.label}</Label>;

                    if (field.type === "select") {
                      return (
                        <div key={field.name} className="space-y-2">
                          {commonLabel}
                          <Select
                            value={(formData[field.name] as string | undefined) ?? undefined}
                            onValueChange={(value) => {
                              setFormData((prev) => ({ ...prev, [field.name]: value }));
                              setAlert(null);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((opt: any) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    }

                    if (field.type === "date") {
                      const valueStr = (formData[field.name] as string) ?? "";
                      return (
                        <div key={field.name} className="space-y-2">
                          {commonLabel}
                          <DateInputBR
                            id={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={valueStr}
                            onChange={(v) => setFormData((prev) => ({ ...prev, [field.name]: v }))}
                          />
                        </div>
                      );
                    }

                    if (field.name === "height") {
                      const v = (formData.height as string) ?? "";
                      const outOfRange = v && (Number(v) < MIN_HEIGHT_CM || Number(v) > MAX_HEIGHT_CM);
                      return (
                        <div key={field.name} className="space-y-2">
                          {commonLabel}
                          <Input
                            id={field.name}
                            name={field.name}
                            inputMode="numeric"
                            placeholder={field.placeholder}
                            value={v}
                            onChange={(e) => {
                              const masked = maskHeightCm(e.target.value);
                              setFormData((prev) => ({ ...prev, height: masked }));
                            }}
                            onBlur={() =>
                              setFormData((prev) => ({ ...prev, height: clampHeight((prev.height as string) ?? "") }))
                            }
                            required={field.required}
                          />
                          {outOfRange && (
                            <p className="text-xs text-red-500">
                              Altura deve estar entre {MIN_HEIGHT_CM} e {MAX_HEIGHT_CM} cm.
                            </p>
                          )}
                        </div>
                      );
                    }

                    if (field.name === "weight") {
                      const v = (formData.weight as string) ?? "";
                      const outOfRange = v && (Number(v) < MIN_WEIGHT_KG || Number(v) > MAX_WEIGHT_KG);
                      return (
                        <div key={field.name} className="space-y-2">
                          {commonLabel}
                          <Input
                            id={field.name}
                            name={field.name}
                            inputMode="numeric"
                            placeholder={field.placeholder}
                            value={v}
                            onChange={(e) => {
                              const masked = maskWeightKg(e.target.value);
                              setFormData((prev) => ({ ...prev, weight: masked }));
                            }}
                            onBlur={() =>
                              setFormData((prev) => ({ ...prev, weight: clampWeight((prev.weight as string) ?? "") }))
                            }
                            required={field.required}
                          />
                          {outOfRange && (
                            <p className="text-xs text-red-500">
                              Peso deve estar entre {MIN_WEIGHT_KG} e {MAX_WEIGHT_KG} kg.
                            </p>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={field.name} className="space-y-2">
                        {commonLabel}
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.name] ?? ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                          required={field.required}
                        />
                      </div>
                    );
                  })}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={step === 0}
                      className={cn(step === 0 && "invisible")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-black dark:text-white border border-verde-accent hover:bg-verde-accent"
                    >
                      {step === steps.length - 1 ? (isSubmitting ? "Submitting..." : "Submit") : (<>
                        Próximo <ArrowRight className="ml-2 h-4 w-4" />
                      </>)}
                    </Button>
                  </div>
                </form>
              </motion.div>
              {alert && <LoginAlerts type={alert.type} message={alert.message} details={alert.details} />}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-10 text-center mt-auto mb-auto"
          >
            <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle2 className="text-green-500 h-8 w-8 -mb-12" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Cadastro Realizado!</h2>
            <p className="text-muted-foreground mb-6">Aguarde enquanto arrumamos tudo para você.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export { RegisterPage };

