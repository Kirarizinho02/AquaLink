import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface MultiStepFormProps {
    className?: string;
    onSubmit?: (data: FormData) => void;
}

const RegisterPage = ({className, onSubmit}: MultiStepFormProps) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    const steps = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
      ],
    },
    {
      id: 'address',
      title: 'Address Information',
      description: 'Where do you live?',
      fields: [
        {
          name: 'address',
          label: 'Address',
          type: 'text',
          placeholder: '123 Main St',
        },
        { name: 'city', label: 'City', type: 'text', placeholder: 'New York' },
        {
          name: 'zipCode',
          label: 'Zip Code',
          type: 'text',
          placeholder: '10001',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account Setup',
      description: 'Create your account',
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'johndoe',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: '••••••••',
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: '••••••••',
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

  return (
      <div
      className={cn(
        'bg-card/40 mx-auto w-full max-w-md h-full h-screen-[-90px] rounded-lg p-6 shadow-sm shadow-azul-quaternario',
        className,
    )}
    >
      {!isComplete ? (
        <>
          {/* Progress bar */}
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

          {/* Step indicators */}
          <div className="mb-8 flex justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                    i < step
                      ? 'bg-azul-primario text-primary-foreground'
                      : i === step
                        ? 'bg-azul-primario text-white ring-primary/30 ring-2'
                        : 'bg-secondary text-secondary-foreground',
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
            <motion.div
              key={step}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-xl font-bold">{steps[step].title}</h2>
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
                    <Input
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name as any)}
                      className={cn(
                        errors[field.name as string] && 'border-destructive',
                      )}
                    />
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
                    className={cn(step === 0 && 'invisible')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className='text-black dark:text-white border border-verde-accent hover:bg-verde-accent'>
                    {step === steps.length - 1 ? (
                      isSubmitting ? (
                        'Submitting...'
                      ) : (
                        'Submit'
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
        </>
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
          <Button
            onClick={() => {
              setStep(0);
              setFormData({});
              setIsComplete(false);
              reset({});
            }}
          >
            Start Over
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export { RegisterPage };