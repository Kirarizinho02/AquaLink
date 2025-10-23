/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { usePageTitle } from "@/hooks";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth, firestore } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

type UserDoc = {
  email: string;
  name: string;        
  lastName: string;
  height: string;
  weight: string;
  birthdate: string;
  gender: string;
  connectedBottle?: string | null;
};

const emptyUserDoc: UserDoc = {
  email: "",
  name: "",
  lastName: "",
  height: "",
  weight: "",
  birthdate: "",
  gender: "",
  connectedBottle: null,
};

const ProfilePage = () => {
  usePageTitle("Perfil | AquaLink");

  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<UserDoc>(emptyUserDoc);
  const [initial, setInitial] = useState<UserDoc>(emptyUserDoc);

  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        if (!currentUser) {
          setLoading(false);
          return;
        }
        const ref = doc(firestore, "users", currentUser.uid);
        const snap = await getDoc(ref);
        const base: UserDoc = {
          ...emptyUserDoc,
          email: currentUser.email || "",
          name: currentUser.displayName?.split(" ")?.[0] || "",
          lastName: currentUser.displayName?.split(" ")?.slice(1).join(" ") || "",
        };
        const merged = snap.exists() ? ({ ...base, ...(snap.data() as Partial<UserDoc>) } as UserDoc) : base;
        if (!active) return;
        setData(merged);
        setInitial(merged);
      } catch (e: any) {
        toast.error("Não foi possível carregar seus dados.");
        // console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => { active = false; };
  }, [currentUser]);

  const dirty = useMemo(() => JSON.stringify(data) !== JSON.stringify(initial), [data, initial]);

  const onChange =
    (key: keyof UserDoc) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setData((d) => ({ ...d, [key]: e.target.value }));
    };

  const onSave = async () => {
    if (!currentUser) {
      toast.error("Você precisa estar logado.");
      return;
    }
    setSaving(true);
    try {
      // Atualiza displayName se mudou nome/sobrenome
      const newDisplayName = `${data.name || ""} ${data.lastName || ""}`.trim();
      const oldDisplayName = `${initial.name || ""} ${initial.lastName || ""}`.trim();
      if (newDisplayName && newDisplayName !== oldDisplayName) {
        await updateProfile(currentUser, { displayName: newDisplayName });
      }

      // Email permanece somente leitura (mudar e-mail exige reautenticação)
      const payload: UserDoc = {
        email: currentUser.email || data.email,
        name: data.name,
        lastName: data.lastName,
        height: data.height,
        weight: data.weight,
        birthdate: data.birthdate,
        gender: data.gender,
        connectedBottle: data.connectedBottle ?? null,
      };

      await setDoc(doc(firestore, "users", currentUser.uid), payload, { merge: true });
      setInitial(payload);
      toast.success("Perfil atualizado com sucesso.");
    } catch (e: any) {
      toast.error(e?.message || "Não foi possível salvar as alterações.");
      // console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <div className="bg-absolute-white dark:bg-black dark:border-white/40 border-black/20 border rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-semibold">Perfil</h2>
          <p className="text-muted-foreground mt-2">Faça login para visualizar e editar seu perfil.</p>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <div className="bg-absolute-white dark:bg-black dark:border-white/40 border-black/20 border rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-semibold">Perfil</h2>
          <p className="text-muted-foreground mt-2">Carregando seus dados...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="bg-absolute-white dark:bg-black dark:border-white/40 border-black/20 border rounded-xl p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">Perfil</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              disabled={!dirty || saving}
              onClick={() => setData(initial)}
            >
              Desfazer
            </Button>
            <Button
              type="button"
              className="bg-verde-accent hover:bg-verde-accent/90 text-white cursor-pointer"
              disabled={!dirty || saving}
              onClick={onSave}
            >
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!saving && dirty) onSave();
          }}
        >
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">E-mail</label>
              <Input value={data.email} disabled readOnly className="bg-muted/30" />
              <p className="text-xs text-muted-foreground mt-1">O e-mail é gerenciado pela sua conta e não pode ser alterado aqui.</p>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm mb-1">Nome</label>
              <Input id="name" value={data.name} onChange={onChange("name")} placeholder="Seu nome" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm mb-1">Sobrenome</label>
              <Input id="lastName" value={data.lastName} onChange={onChange("lastName")} placeholder="Seu sobrenome" />
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-sm mb-1">Data de Nascimento</label>
              <Input id="birthdate" type="date" value={data.birthdate} onChange={onChange("birthdate")} />
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="gender" className="block text-sm mb-1">Gênero</label>
              <Select
                value={data.gender}
                onValueChange={(val) => setData((d) => ({ ...d, gender: val }))}
              >
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                  <SelectItem value="prefiro_nao_dizer">Prefiro não dizer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="height" className="block text-sm mb-1">Altura (cm)</label>
              <Input
                id="height"
                inputMode="numeric"
                value={data.height}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d]/g, "");
                  setData((d) => ({ ...d, height: v }));
                }}
                placeholder="ex.: 175"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm mb-1">Peso (kg)</label>
              <Input
                id="weight"
                inputMode="numeric"
                value={data.weight}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d.,]/g, "").replace(",", ".");
                  setData((d) => ({ ...d, weight: v }));
                }}
                placeholder="ex.: 70"
              />
            </div>
            <div>
              <label htmlFor="connectedBottle" className="block text-sm mb-1">Garrafa Conectada</label>
              <Input
                id="connectedBottle"
                value={data.connectedBottle ?? ""}
                onChange={onChange("connectedBottle")}
                placeholder="ID da garrafa (opcional)"
              />
              <p className="text-xs text-muted-foreground mt-1">Vincule o ID da sua garrafa para sincronizar dados.</p>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer"
              disabled={!dirty || saving}
              onClick={() => setData(initial)}
            >
              Desfazer
            </Button>
            <Button
              type="submit"
              className="bg-verde-accent hover:bg-verde-accent/90 text-white cursor-pointer"
              disabled={!dirty || saving}
            >
              {saving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export { ProfilePage };