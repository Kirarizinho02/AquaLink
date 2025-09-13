/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

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

import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { logo_no_writing_aqualink_primary, water_bar } from "@/assets";
import { useNavigate } from "react-router-dom";

interface FormData {
  [key: string]: any;
}

interface MultiStepFormProps {
  className?: string;
  onSubmit?: (data: FormData) => void;
}

const RegisterPage = ({ className, onSubmit }: MultiStepFormProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      id: "personal",
      title: "Informações Pessoais",
      description: "Conte-nos sobre você",
      fields: [
        {
          name: "firstName",
          label: "Nome",
          type: "text",
          placeholder: "João",
        },
        {
          name: "lastName",
          label: "Sobrenome",
          type: "text",
          placeholder: "Silva",
        },
        {
          name: "email",
          label: "E-mail",
          type: "email",
          placeholder: "joao.silva@exemplo.com",
        },
      ],
    },
    {
      id: "address",
      title: "Informações Adicionais",
      description: "Nos conte mais sobre você.",
      fields: [
        {
          name: "height",
          label: "Altura",
          type: "text",
          placeholder: "1.75m",
        },
        {
          name: "date",
          label: "Data de Nascimento",
          type: "text",
          placeholder: "30/11/2000",
        },
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
        },
      ],
    },
    {
      id: "account",
      title: "Configuração da Conta",
      description: "Crie sua conta",
      fields: [
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "••••••••",
        },
        {
          name: "confirmPassword",
          label: "Confirmar Senha",
          type: "password",
          placeholder: "••••••••",
        },
      ],
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    defaultValues: formData,
  });

  const progress = ((step + 1) / steps.length) * 100;

  const handleNextStep = (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step < steps.length - 1) {
      setStep(step + 1);
      reset(updatedData);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        if (onSubmit) {
          onSubmit(updatedData as FormData);
        }
        setIsComplete(true);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

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

      if (levelInput) {
        levelInput.value = from + (to - from) * eased;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      }
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
    animateLevel(from, target, 1200); // 1200ms de duração

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [step, levelInput]);

  // Esses códigos acima são todos para a configuração da animação do Rive.
  // Em resumo, ele configura a animação para responder às mudanças de etapa do formulário, ajustando o nível da animação de acordo com o progresso do usuário no formulário.

  const navigation = useNavigate();

  return (
    <div
      className="inset-0 w-full bg-[radial-gradient(var(--color-grid)_1px,transparent_1px)] 
      [background-size:16px_16px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_60%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_90%_60%_at_50%_50%,#000_80%,transparent_100%)]"
    >
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:block mt-20">
          <RiveComponent style={{ width: "100%", height: "100%"}} />
        </div>
        {!isComplete ? (
          <div
            className={cn(
              "w-[90%] md:w-[70%] lg:max-w-xl my-20 mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-md",
              className
            )}
          >
            <div className="mb-4 flex justify-center">
              <a onClick={() => navigation("/")} className="cursor-pointer">
                <img
                  src={logo_no_writing_aqualink_primary}
                  alt="AquaLink Logo"
                  className="max-w-[55px]"
                />
              </a>
            </div>
            {/* Barra de progresso */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">
                  Passo {step + 1} de {steps.length}
                </span>
                <span className="text-sm font-medium">
                  {Math.round(progress)}%
                </span>
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
                    {i < step ? (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="mt-1 hidden text-xs sm:block">
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold ">{steps[step].title}</h2>
                  <p className="text-muted-foreground text-sm">
                    {steps[step].description}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(handleNextStep)}
                  className="space-y-4"
                >
                  {steps[step].fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      {field.type === "select" ? (
                        <Select
                          value={formData[field.name] ?? ""}
                          onValueChange={(value) => {
                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: value,
                            }));
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          {...register(field.name as any)}
                          className={cn(
                            errors[field.name as string] && "border-destructive"
                          )}
                        />
                      )}
                      {errors[field.name as string] && (
                        <p className="text-destructive text-sm">
                          {errors[field.name as string]?.message as string}
                        </p>
                      )}
                    </div>
                  ))}

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
                      {step === steps.length - 1 ? (
                        isSubmitting ? (
                          "Submitting..."
                        ) : (
                          "Submit"
                        )
                      ) : (
                        <>
                          Próximo <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="py-10 text-center"
          >
            <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <CheckCircle2 className="text-primary h-8 w-8" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Cadastro Realizado!</h2>
            <p className="text-muted-foreground mb-6">
              Aguarde enquanto arrumamos tudo para você.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export { RegisterPage };
