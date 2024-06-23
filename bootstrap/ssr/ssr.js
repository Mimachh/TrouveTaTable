import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import React__default, { useEffect, createContext, useState, useContext, useRef, forwardRef } from "react";
import { useTheme as useTheme$1 } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useForm, Head, router, Link, usePage, createInertiaApp } from "@inertiajs/react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { LoaderCircle, MailIcon, ArrowLeft, Settings as Settings$1, LayoutDashboard, HandPlatter, X, Search, Store, ChevronsUpDown, Check, PlusCircle, ChevronRight, Circle, Sun, Moon, Zap, ImageIcon, VideoIcon, Trash, Plus, ChevronDown, ChevronUp, Edit as Edit$2, ArrowRight, Copy, ChevronLeft, MoreHorizontal, ArrowUpDown, MessageCircle, Phone, MessageSquare, Star as Star$1, CalendarDays, Camera, CameraIcon, Upload, CalendarX, ExternalLink, Minus, Calendar as Calendar$2, Clock, User2, CalendarCheck, StarIcon, CheckIcon } from "lucide-react";
import { motion, useAnimationControls, AnimatePresence, m, LazyMotion, domAnimation, useAnimate, stagger, useCycle, MotionConfig, useScroll, useMotionValueEvent, useMotionValue, useMotionTemplate } from "framer-motion";
import { ChevronRightIcon, XMarkIcon, ArrowTrendingUpIcon, UserGroupIcon, PencilIcon, BoltIcon, CursorArrowRaysIcon, AdjustmentsHorizontalIcon, UserIcon, BellAlertIcon, UsersIcon, ChatBubbleLeftRightIcon, DocumentIcon, ClockIcon, CalendarDaysIcon, ChartBarIcon, BugAntIcon, ComputerDesktopIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Command as Command$1 } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { create } from "zustand";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useDateSegment, useLocale, useTimeField } from "react-aria";
import { useTimeFieldState, useDatePickerState } from "react-stately";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { format, parse, eachDayOfInterval, startOfWeek, endOfWeek, endOfMonth, getDay, isEqual, isToday, isSameMonth, add, isBefore, endOfDay, isSameDay, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ChevronLeftIcon, ChevronRightIcon as ChevronRightIcon$1 } from "@heroicons/react/20/solid";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Transition } from "@headlessui/react";
import { DayPicker } from "react-day-picker";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme$1();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const ToastProvider = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Toaster, {}),
    children
  ] });
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function Guest$1({ children, title, description }) {
  return /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-secondary", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl text-center", children: title }),
      description && /* @__PURE__ */ jsx(CardDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "grid gap-4", children })
  ] }) }) });
}
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: "text-sm text-destructive " + className, children: message }) : null;
}
const FormFieldLayout = ({
  children,
  label,
  description,
  fieldName,
  error,
  className
}) => {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-form-field", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsx(
        Label,
        {
          htmlFor: fieldName,
          className: cn(error ? "text-destructive" : ""),
          children: label
        }
      ),
      description && /* @__PURE__ */ jsx("p", { className: "form-description", children: description })
    ] }),
    children,
    /* @__PURE__ */ jsx(InputError, { message: error, className: "mt-2 font-semibold" })
  ] });
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primaryBlue: "bg-primaryBlue text-background-foreground hover:bg-primaryBlue/90",
        premium: "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white border-0"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-7 px-2 py-1 text-xs"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function ConfirmPassword() {
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };
  return /* @__PURE__ */ jsxs(
    Guest$1,
    {
      title: "Confirmation du mot de passe",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Confirmation du mot de passe" }),
        /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "C'est une zone sécurisée de l'application. Veuillez confirmer votre mot de passe avant de continuer." }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Mot de passe",
              fieldName: "password",
              error: errors.password,
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  name: "password",
                  value: data2.password,
                  className: "mt-1 block w-full",
                  onChange: (e) => setData("password", e.target.value)
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { className: "ms-4", disabled: processing, children: "Confirmer" }) })
        ] })
      ]
    }
  );
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data: data2, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(
    Guest$1,
    {
      title: "Mot de passe oublié",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Mot de passe oublié" }),
        /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-muted-foreground", children: "Mot de passe oublié ? Pas de problème. Indiquez-nous votre adresse e-mail et nous vous enverrons un lien de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau." }),
        status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Email",
              fieldName: "email",
              error: errors.email,
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  name: "email",
                  value: data2.email,
                  onChange: (e) => setData("email", e.target.value)
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { className: "ms-4", disabled: processing, children: "Envoyer le lien de réinitialisation" }) })
        ] })
      ]
    }
  );
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
const LoginForm = (props) => {
  const {
    canResetPassword = true,
    mode,
    onAlreadyHaveAnAccountClick
  } = props;
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Email",
        fieldName: "email",
        error: errors.email,
        children: /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data2.email,
            className: "mt-1 block w-full py-3 border",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Mot de passe",
        fieldName: "password",
        error: errors.password,
        children: /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data2.password,
            className: "mt-1 block w-full py-3 border",
            autoComplete: "username",
            onChange: (e) => setData("password", e.target.value)
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: " mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data2.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm ", children: "Se souvenir de moi" })
      ] }),
      canResetPassword && /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "link",
          onClick: () => {
            router.visit(route("password.request"));
          },
          children: "Mot de passe oublié ?"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pt-4 w-full text-center", children: [
      /* @__PURE__ */ jsx(Button, { className: "w-full", disabled: processing, children: "Connexion" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "link",
          type: "button",
          onClick: () => {
            if (mode == "modal" && onAlreadyHaveAnAccountClick) {
              onAlreadyHaveAnAccountClick("register");
            } else {
              router.visit(route("register"));
            }
          },
          children: [
            " ",
            "Pas encore de compte ?",
            " "
          ]
        }
      )
    ] })
  ] });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LoginForm
}, Symbol.toStringTag, { value: "Module" }));
function Login({
  status,
  canResetPassword = true
}) {
  return /* @__PURE__ */ jsxs(
    Guest$1,
    {
      title: "Connexion",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Connexion" }),
        status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
        /* @__PURE__ */ jsx(LoginForm, {})
      ]
    }
  );
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const RegisterForm = (props) => {
  const { mode = "page", onAlreadyHaveAnAccountClick } = props;
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"), {
      preserveScroll: true
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-form-field", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-2 md:gap-3", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "name",
          label: "Nom",
          error: errors.name,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              name: "name",
              value: data2.name,
              autoComplete: "name",
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "email",
          label: "Email",
          error: errors.email,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "emailRegister",
              name: "email",
              value: data2.email,
              autoComplete: "email",
              onChange: (e) => setData("email", e.target.value),
              required: true
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        fieldName: "password",
        label: "Mot de passe",
        error: errors.password,
        children: /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            name: "password",
            value: data2.password,
            type: "password",
            autoComplete: "password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        fieldName: "password_confirmation",
        label: "Confirmation du mot de passe",
        error: errors.password_confirmation,
        children: /* @__PURE__ */ jsx(
          Input,
          {
            id: "password_confirmation",
            name: "password_confirmation",
            value: data2.password_confirmation,
            type: "password",
            autoComplete: "password_confirmation",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "text-center pt-4 block", children: [
      /* @__PURE__ */ jsx(Button, { className: "w-full", disabled: processing, children: "S'inscrire" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "link",
          onClick: () => {
            if (mode == "modal") {
              if (!onAlreadyHaveAnAccountClick)
                return;
              onAlreadyHaveAnAccountClick("login");
            } else {
              router.visit(route("login"));
            }
          },
          children: "Déjà un compte ?"
        }
      )
    ] })
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RegisterForm
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  return /* @__PURE__ */ jsxs(
    Guest$1,
    {
      title: "Inscription",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Inscription" }),
        /* @__PURE__ */ jsx(RegisterForm, {})
      ]
    }
  );
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({
  token,
  email
}) {
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"));
  };
  return /* @__PURE__ */ jsxs(
    Guest$1,
    {
      title: "Réinitialiser le mot de passe",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Réinitialiser le mot de passe" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-form-field", children: [
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Email",
              fieldName: "email",
              error: errors.email,
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  type: "email",
                  name: "email",
                  value: data2.email,
                  onChange: (e) => setData("email", e.target.value)
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Mot de passe",
              fieldName: "password",
              error: errors.password,
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  name: "password",
                  value: data2.password,
                  onChange: (e) => setData("password", e.target.value)
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Confirmation du mot de passe",
              fieldName: "password_confirmation",
              error: errors.password_confirmation,
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password_confirmation",
                  type: "password",
                  name: "password_confirmation",
                  value: data2.password_confirmation,
                  onChange: (e) => setData("password_confirmation", e.target.value)
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { className: "ms-4", disabled: processing, children: "Réinitialiser le mot de passe" }) })
        ] })
      ]
    }
  );
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function PrimaryButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(
    Guest$1,
    {
      title: "Vérification de l'email",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Vérification de l'email" }),
        /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
        /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("logout"),
              method: "post",
              as: "button",
              className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: "Log Out"
            }
          )
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
const Bye = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Compte supprimé" }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-secondary border shadow rounded-lg h-[150px] p-6 flex flex-col items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "header-title", children: "Compte supprimé !" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary/60", children: [
        "Nous sommes désolé de vous voir partir. ",
        /* @__PURE__ */ jsx("br", {}),
        " A bientôt !"
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-primaryBlue text-base font-medium", children: "Accueil" })
    ] }) })
  ] });
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bye
}, Symbol.toStringTag, { value: "Module" }));
const SubmitButton = ({ children, disabled, type, variant, ...props }) => {
  const v = variant ?? "default";
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: v,
      ...props,
      disabled,
      type: type || "button",
      children: disabled ? /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "w-6 h-6 animate animate-spin" }) }) : /* @__PURE__ */ jsx(Fragment, { children })
    }
  );
};
const NewsletterForm = () => {
  const { data: data2, setData, processing, errors, post, reset } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("newsletter.app.subscribe"), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Vous êtes inscrit à notre newsletter");
        reset();
      },
      onError: (errors2) => {
        toast.error("Une erreur s'est produite lors de l'inscription");
      }
    });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
    /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2 font-semibold" }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full ", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data2.email,
          onChange: (e) => setData("email", e.target.value),
          placeholder: "email@gmail.com",
          className: "z-0 rounded-full border w-full pl-10 focus:ring-2 focus:ring-teal-500 relative mt-4 h-11 bg-background"
        }
      ),
      /* @__PURE__ */ jsx(MailIcon, { className: "w-5 h-5 absolute left-3 text-neutral-500 top-1/2 -translate-y-1/2" }),
      /* @__PURE__ */ jsx(
        SubmitButton,
        {
          disabled: processing,
          type: "submit",
          className: "rounded-full absolute right-1 top-1/2 -translate-y-1/2 h-9",
          children: "Inscription"
        }
      )
    ] })
  ] });
};
const data$1 = [
  {
    date: "2024-05-24",
    formatDate: "May 24, 2024",
    goal: "Catalyst: Application layouts, navigation menus, description lists, and more",
    body: [
      {
        content: `We just published the first major update to Catalyst since releasing the development preview, with two new application layouts, navbar and sidebar components, description lists, and more. Here's a complete list of all the new components, available in both JavaScript and TypeScript:`
      },
      {
        content: `We just published the first major update to Catalyst since releasing the development preview, with two new application layouts, navbar and sidebar components, description lists, and more. Here's a complete list of all the new components, available in both JavaScript and TypeScript:`
      }
    ]
  }
];
const Index$5 = () => {
  return /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-20 text-center pb-20", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("home"),
          className: " gap-2 border w-fit flex items-center rounded-md px-3 py-1.5 hover:bg-secondary/30 transition-all",
          children: [
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3 h-3 mr-0.5" }) }),
            /* @__PURE__ */ jsx("span", { children: "Retour à l'accueil" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl", children: "Changelog" }),
      /* @__PURE__ */ jsx("p", { className: "pt-5 text-neutral-600 tracking-tight", children: "Soyez tenu au courant des changements apportés à nos services." }),
      /* @__PURE__ */ jsx("div", { className: "max-w-sm mx-auto", children: /* @__PURE__ */ jsx(NewsletterForm, {}) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", children: data$1.map((item, index) => /* @__PURE__ */ jsxs(
      "section",
      {
        id: item.date,
        "aria-labelledby": `${item.date}-heading`,
        className: "md:flex",
        children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              id: `${item.date}-heading`,
              className: "pl-7 text-sm leading-6 text-slate-500 md:w-1/4 md:pl-0 md:pr-12 md:text-right",
              children: /* @__PURE__ */ jsx("a", { href: `#${item.date}`, children: item.formatDate })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative pl-7 pt-2 md:w-3/4 md:pl-12 md:pt-0 pb-16", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-px bg-slate-200 -top-3 md:top-2.5" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -left-1 -top-[1.0625rem] h-[0.5625rem] w-[0.5625rem] rounded-full border-2 border-slate-300 bg-white md:top-[0.4375rem]" }),
            /* @__PURE__ */ jsxs("div", { className: "max-w-none prose-h3:mb-4 prose-h3:text-base prose-h3:leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600", children: [
              /* @__PURE__ */ jsx("h3", { children: item.goal }),
              item.body.map((body, index2) => /* @__PURE__ */ jsx("p", { children: body.content }, index2))
            ] })
          ] })
        ]
      },
      index
    )) })
  ] }) });
};
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$5
}, Symbol.toStringTag, { value: "Module" }));
const initialState = {
  theme: "system",
  setTheme: () => null
};
const ThemeProviderContext = createContext(initialState);
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme2) => {
      localStorage.setItem(storageKey, theme2);
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsx(ThemeProviderContext.Provider, { ...props, value, children });
}
const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
const NavigationLink = ({ children, name, href, active }) => {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href,
      className: cn(
        "flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-muted stroke-secondary-foreground/60 text-secondary-foreground/60 hover:text-muted place-items-center gap-3 hover:bg-secondary-foreground/80 transition-colors duration-100",
        active && "stroke-muted text-muted bg-secondary-foreground/80"
      ),
      children: [
        children,
        /* @__PURE__ */ jsx("p", { className: "text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide", children: name })
      ]
    }
  );
};
const ProjectLink = ({ children, name, setSelectedProject, className, active = false }) => {
  const handleClick = () => {
    setSelectedProject(null);
    setTimeout(() => {
      setSelectedProject(name);
    }, 250);
  };
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: "#",
      onClick: handleClick,
      className: cn("flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-primary/20 transition-colors duration-100", className, active && "stroke-muted text-muted bg-secondary-foreground/80"),
      children: [
        children,
        /* @__PURE__ */ jsxs("div", { className: "flex overflow-clip place-items-center justify-between w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "text-inherit truncate whitespace-nowrap tracking-wide", children: name }),
          /* @__PURE__ */ jsx(ChevronRightIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8" })
        ] })
      ]
    }
  );
};
const variants = {
  close: {
    x: -300,
    opacity: 0
  },
  open: {
    x: 0,
    opacity: 100
  }
};
const ProjectNavigation = ({
  id,
  selectedProject,
  isOpen,
  setSelectedProject,
  restaurant
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: selectedProject === "Utilisateurs" ? /* @__PURE__ */ jsx(
    UserProjectNavigation,
    {
      id,
      selectedProject,
      isOpen,
      setSelectedProject,
      restaurant
    }
  ) : selectedProject === "Paramètres" ? /* @__PURE__ */ jsx(
    SettingsProjectNavigation,
    {
      id,
      selectedProject,
      isOpen,
      setSelectedProject,
      restaurant
    }
  ) : /* @__PURE__ */ jsx(
    DefaultProjectNavigation,
    {
      id,
      selectedProject,
      isOpen,
      setSelectedProject,
      restaurant
    }
  ) });
};
const DefaultProjectNavigation = (props) => {
  const { id, selectedProject, isOpen, setSelectedProject } = props;
  return /* @__PURE__ */ jsxs(
    motion.nav,
    {
      variants,
      initial: "close",
      id,
      animate: "open",
      exit: "close",
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      },
      className: `h-full min-h-screen flex flex-col gap-8 w-64 absolute bg-secondary ml-0 z-50 ${isOpen ? "left-64" : "left-20"} border-r border-secondary-foreground/20 p-5`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full justify-between place-items-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "tracking-wide text-secondary-foreground/80 text-lg", children: selectedProject }),
          /* @__PURE__ */ jsx("button", { onClick: () => setSelectedProject(null), children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-8 stroke-secondary-foreground/60" }) })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            placeholder: "Search",
            type: "text",
            className: "px-3 py-2 tracking-wide rounded-lg bg-background text-muted-foreground/80"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Progress",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(ArrowTrendingUpIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Team Members",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(UserGroupIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "In Review",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(PencilIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "In Progress",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(BoltIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Up Next",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(CursorArrowRaysIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Project Settings",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(AdjustmentsHorizontalIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsx("h1", { className: "tracking-wide text-secondary-foreground/80", children: "Team Members" }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex flex-row gap-3 place-items-center", children: [
            /* @__PURE__ */ jsx(UserIcon, { className: "w-8 p-1 rounded-full stroke-2 stroke-rose-800 bg-rose-200/70" }),
            /* @__PURE__ */ jsx("p", { className: "tracking-wide text-secondary-foreground/60", children: "Steve Jobs" })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex flex-row gap-3 place-items-center", children: [
            /* @__PURE__ */ jsx(UserIcon, { className: "w-8 p-1 rounded-full stroke-2 stroke-emerald-800 bg-emerald-200/70" }),
            /* @__PURE__ */ jsx("p", { className: "tracking-wide text-secondary-foreground/60", children: "Bill Gates" })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "#", className: "flex flex-row gap-3 place-items-center", children: [
            /* @__PURE__ */ jsx(UserIcon, { className: "w-8 p-1 rounded-full stroke-2 stroke-indigo-800 bg-indigo-200/70" }),
            /* @__PURE__ */ jsx("p", { className: "tracking-wide text-secondary-foreground/60", children: "Jeff Bezos" })
          ] })
        ] })
      ]
    }
  );
};
const UserProjectNavigation = (props) => {
  const { id, selectedProject, isOpen, setSelectedProject, restaurant } = props;
  return /* @__PURE__ */ jsxs(
    motion.nav,
    {
      variants,
      initial: "close",
      id,
      animate: "open",
      exit: "close",
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      },
      className: `h-full min-h-screen flex flex-col gap-16 w-64 absolute bg-secondary ml-0 z-50 ${isOpen ? "left-64" : "left-20"} border-r border-secondary-foreground/20 p-5`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full h-fit justify-between place-items-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "tracking-wide text-secondary-foreground/80 text-lg", children: selectedProject }),
          /* @__PURE__ */ jsx("button", { onClick: () => setSelectedProject(null), children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-8 stroke-secondary-foreground/60" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "L'équipe",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(UserGroupIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Clients",
              href: route("dashboard"),
              active: route().current("dashboard"),
              children: /* @__PURE__ */ jsx(ArrowTrendingUpIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Newsletter",
              href: route("dashboard.newsletter.index", restaurant.id),
              active: route().current(
                "dashboard.newsletter.index",
                restaurant.id
              ),
              children: /* @__PURE__ */ jsx(PencilIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Avis clients",
              href: route("dashboard.ratings.index", restaurant.id),
              active: route().current(
                "dashboard.ratings.index",
                restaurant.id
              ),
              children: /* @__PURE__ */ jsx(BoltIcon, { className: "stroke-[0.75] stroke-inherit min-w-8 w-8" })
            }
          )
        ] })
      ]
    }
  );
};
const SettingsProjectNavigation = (props) => {
  const { id, selectedProject, isOpen, setSelectedProject, restaurant } = props;
  return /* @__PURE__ */ jsxs(
    motion.nav,
    {
      variants,
      initial: "close",
      id,
      animate: "open",
      exit: "close",
      transition: {
        duration: 0.25,
        ease: "easeInOut"
      },
      className: `h-full min-h-screen flex flex-col gap-16 w-64 absolute bg-secondary ml-0 z-50 ${isOpen ? "left-64" : "left-20"} border-r border-secondary-foreground/20 p-5`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full h-fit justify-between place-items-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "tracking-wide text-secondary-foreground/80 text-lg", children: selectedProject }),
          /* @__PURE__ */ jsx("button", { onClick: () => setSelectedProject(null), children: /* @__PURE__ */ jsx(XMarkIcon, { className: "w-8 stroke-secondary-foreground/60" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Généraux",
              href: route(
                "dashboard.settings.index",
                restaurant.id
              ),
              active: route().current(
                "dashboard.settings.index",
                restaurant.id
              ),
              children: /* @__PURE__ */ jsx(Settings$1, { className: "stroke-inherit stroke-[0.75] min-w-6 w-6 h-6" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Notifications",
              href: route(
                "dashboard.settings.notifications.index",
                restaurant.id
              ),
              active: route().current(
                "dashboard.settings.notifications.index",
                restaurant.id
              ),
              children: /* @__PURE__ */ jsx(BellAlertIcon, { className: "stroke-inherit stroke-[0.75] min-w-6 w-6 h-6" })
            }
          )
        ] })
      ]
    }
  );
};
const containerVariants$1 = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  }
};
const svgVariants$1 = {
  close: {
    rotate: 360
  },
  open: {
    rotate: 180
  }
};
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();
  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector("nav");
      const projectNav = document.querySelector("#project-navigation");
      if (selectedProject === null) {
        if (nav && !nav.contains(event.target)) {
          setIsOpen(false);
        }
      } else {
        if (nav && !nav.contains(event.target) && projectNav && !projectNav.contains(event.target)) {
          setIsOpen(false);
          setSelectedProject(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProject]);
  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };
  const props = usePage().props;
  const { restaurant } = props;
  const current_restaurant = restaurant.data;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "sticky z-10 top-0 left-0 h-fit", children: /* @__PURE__ */ jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxs(
      motion.nav,
      {
        variants: containerVariants$1,
        animate: containerControls,
        initial: "close",
        className: "bg-secondary border border-r flex flex-col p-5 justify-start absolute gap-24 top-0 left-0 min-h-full h-fit shadow",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row w-full justify-between place-items-center h-full", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "p-1 rounded-full flex",
                onClick: () => handleOpenClose(),
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1,
                    stroke: "currentColor",
                    className: "w-8 h-8 stroke-secondary-foreground/80",
                    children: /* @__PURE__ */ jsx(
                      motion.path,
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        variants: svgVariants$1,
                        animate: svgControls,
                        d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
                        transition: {
                          duration: 0.5,
                          ease: "easeInOut"
                        }
                      }
                    )
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 ", children: [
            /* @__PURE__ */ jsx(
              NavigationLink,
              {
                name: "Dashboard",
                href: route("dashboard", current_restaurant.id),
                active: route().current("dashboard", current_restaurant.id),
                children: /* @__PURE__ */ jsx(LayoutDashboard, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8 h-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              ProjectLink,
              {
                name: "Utilisateurs",
                setSelectedProject,
                className: "text-red-600 flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-muted stroke-secondary-foreground/60 text-secondary-foreground/60 hover:text-muted place-items-center gap-3 hover:bg-secondary-foreground/80 transition-colors duration-100",
                children: /* @__PURE__ */ jsx(UsersIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              NavigationLink,
              {
                name: "Messages",
                href: route("dashboard.messages.index", current_restaurant.id),
                active: route().current("dashboard.messages.index", current_restaurant.id),
                children: /* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              NavigationLink,
              {
                name: "Ma page",
                href: route("dashboard.page.index", current_restaurant.id),
                active: route().current("dashboard.page.index", current_restaurant.id),
                children: /* @__PURE__ */ jsx(DocumentIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              NavigationLink,
              {
                name: "Tables",
                href: route("dashboard.tables.index", current_restaurant.id),
                active: route().current("dashboard.tables.index", current_restaurant.id),
                children: /* @__PURE__ */ jsx(HandPlatter, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8 h-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              NavigationLink,
              {
                name: "Horaires",
                href: route("dashboard.hours.index", current_restaurant.id),
                active: route().current("dashboard.hours.index", current_restaurant.id),
                children: /* @__PURE__ */ jsx(ClockIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              NavigationLink,
              {
                name: "Réservations",
                href: route("dashboard.reservation.index", current_restaurant.id),
                active: route().current("dashboard.reservation.index", current_restaurant.id),
                children: /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8" })
              }
            ),
            /* @__PURE__ */ jsx(
              ProjectLink,
              {
                name: "Paramètres",
                active: route().current("dashboard.settings.index", current_restaurant.id) || route().current("dashboard.settings.notifications.index", current_restaurant.id),
                setSelectedProject,
                className: "text-red-600 flex p-1 rounded cursor-pointer stroke-[0.75] hover:stroke-muted stroke-secondary-foreground/60 text-secondary-foreground/60 hover:text-muted place-items-center gap-3 hover:bg-secondary-foreground/80 transition-colors duration-100",
                children: /* @__PURE__ */ jsx(Settings$1, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8 h-8" })
              }
            )
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: selectedProject && /* @__PURE__ */ jsx(
      ProjectNavigation,
      {
        id: "project-navigation",
        selectedProject,
        setSelectedProject,
        isOpen,
        restaurant: restaurant.data
      }
    ) })
  ] });
};
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground  data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const createSelectors$b = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useRestaurantModal = createSelectors$b(create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: false,
  setReset: (reset) => set({ reset })
})));
function RestaurantSwitcher({ className, items = [] }) {
  if (!items) {
    return null;
  }
  const restaurantModalOnOpen = useRestaurantModal.use.onOpen();
  const props = usePage().props;
  const restaurant = props.restaurant.data;
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));
  const currentRestaurant = formattedItems.find((item) => item.value === restaurant.id);
  const [open, setOpen] = React.useState(false);
  const onRestaurantSelect = (restaurant2) => {
    setOpen(false);
    router.visit(`/dashboard/${restaurant2.value}`);
  };
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            role: "combobox",
            "aria-expanded": open,
            "aria-label": "Select a restaurant",
            className: cn("w-[200px] justify-between", className),
            children: [
              /* @__PURE__ */ jsx(Store, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("p", { className: "truncate ", children: currentRestaurant == null ? void 0 : currentRestaurant.label }),
              /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-auto h-4 w-4 shrink-0 opacity-50" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(PopoverContent, { className: "w-[200px] p-0 relative z-50", children: /* @__PURE__ */ jsxs(Command, { children: [
          /* @__PURE__ */ jsxs(CommandList, { children: [
            /* @__PURE__ */ jsx(CommandInput, { placeholder: "Rechercher..." }),
            /* @__PURE__ */ jsx(CommandEmpty, { children: "Aucun restaurant trouvé." }),
            /* @__PURE__ */ jsx(CommandGroup, { heading: "Restaurants", children: formattedItems.map((item) => /* @__PURE__ */ jsxs(
              CommandItem,
              {
                onSelect: () => onRestaurantSelect(item),
                className: "text-sm",
                children: [
                  /* @__PURE__ */ jsx(Store, { className: "mr-2 h-4 w-4" }),
                  item.label,
                  /* @__PURE__ */ jsx(
                    Check,
                    {
                      className: cn(
                        "ml-auto h-4 w-4",
                        (currentRestaurant == null ? void 0 : currentRestaurant.value) === item.value ? "opacity-100" : "opacity-0"
                      )
                    }
                  )
                ]
              },
              item.value
            )) })
          ] }),
          /* @__PURE__ */ jsx(CommandSeparator, {}),
          /* @__PURE__ */ jsx(CommandList, { children: /* @__PURE__ */ jsx(CommandGroup, { children: /* @__PURE__ */ jsxs(
            CommandItem,
            {
              onSelect: () => {
                setOpen(false);
                restaurantModalOnOpen();
              },
              children: [
                /* @__PURE__ */ jsx(PlusCircle, { className: "mr-2 h-5 w-5" }),
                "Ajouter un restaurant"
              ]
            }
          ) }) })
        ] }) })
      ]
    }
  );
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function ModeToggle() {
  const { setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "icon", children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("light"), children: "Light" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("dark"), children: "Dark" }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => setTheme("system"), children: "System" })
    ] })
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        premium: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const getDashboardMainNav = (id) => {
  const routes = [
    {
      href: route("dashboard", id),
      label: "Dashboard",
      active: route().current("dashboard")
    },
    { href: "/settings", label: "Settings" }
  ];
  return routes;
};
const DashboardMainNav = ({
  className,
  ...props
}) => {
  const restaurant = usePage().props.restaurant;
  const currentRestaurant = restaurant.data;
  getDashboardMainNav(currentRestaurant.id);
  const tools = [
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
      color: "text-pink-700"
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
      color: "text-orange-700"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: cn(
        "flex items-center space-x-4 lg:space-x-6",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(Card, { className: "border-0 py-2", children: /* @__PURE__ */ jsx(CardContent, { className: "flex items-center py-0", children: /* @__PURE__ */ jsxs(Button, { variant: "premium", className: "w-full", children: [
          "Prendre un abonnement",
          /* @__PURE__ */ jsx(Zap, { className: "ml-2 h-4 w-4 fill-white" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Dialog, { open: false, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { className: "flex justify-center items-center flex-col gap-y-4 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2 font-bold text-xl", children: [
              "Upgrade to Genius",
              /* @__PURE__ */ jsx(Badge, { variant: "premium", className: "uppercase text-sm py-1", children: "pro" })
            ] }) }),
            /* @__PURE__ */ jsx(DialogDescription, { className: "text-center pt-2 space-y-2 text-zinc-900 font-medium", children: tools.map((tool) => /* @__PURE__ */ jsxs(Card, { className: "p-3 border-black/5 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-4", children: [
                /* @__PURE__ */ jsx("div", { className: cn("p-2 w-fit rounded-md", tool.bgColor), children: /* @__PURE__ */ jsx(tool.icon, { className: cn("w-6 h-6", tool.color) }) }),
                /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm", children: tool.label })
              ] }),
              /* @__PURE__ */ jsx(Check, { className: "text-primary w-5 h-5" })
            ] }, tool.href)) })
          ] }),
          /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "premium", className: "w-full", children: [
            "Upgrade",
            /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 ml-2 fill-white" })
          ] }) })
        ] }) })
      ]
    }
  );
};
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}
const Avatar$1 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar$1.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const UserAvatar = () => {
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Avatar$1, { className: "cursor-pointer", children: [
      /* @__PURE__ */ jsx(AvatarImage, { src: "https://github.com/shadcn.png" }),
      /* @__PURE__ */ jsx(AvatarFallback, { children: "CN" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Mon compte" }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx(Link, { href: route("profile.edit"), children: "Profil" }) }),
      /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          children: "Déconnexion"
        }
      ) })
    ] })
  ] });
};
const DashboardNavbar = () => {
  const [resto, setResto] = useState(null);
  const [loading, setLoading] = useState(true);
  const getRestaurants = () => {
    setLoading(true);
    axios.get(route("get.my.restaurants")).then((response) => {
      setResto(response.data);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  };
  const restaurantModalReset = useRestaurantModal.use.reset();
  const restaurantModalSetReset = useRestaurantModal.use.setReset();
  useEffect(() => {
    getRestaurants();
    if (restaurantModalReset) {
      setLoading(true);
      getRestaurants();
      restaurantModalSetReset(false);
    }
  }, [restaurantModalReset]);
  return /* @__PURE__ */ jsx("div", { className: "border-b", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 items-center px-4 md:px-10", children: [
    !loading ? /* @__PURE__ */ jsx(RestaurantSwitcher, { items: resto }) : /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-[200px] rounded bg-secondary" }),
    /* @__PURE__ */ jsx(DashboardMainNav, { className: "mx-6 hidden md:flex" }),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx(ModeToggle, {}),
      /* @__PURE__ */ jsx(UserAvatar, {})
    ] })
  ] }) });
};
const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  dialogContentClasses = "",
  dialogTitleClasses = ""
}) => {
  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open: isOpen, onOpenChange: onChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: cn(dialogContentClasses), children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(
        DialogTitle,
        {
          className: cn(dialogTitleClasses),
          children: title
        }
      ),
      description && /* @__PURE__ */ jsx(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { children })
  ] }) });
};
const Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: "loader", children: /* @__PURE__ */ jsx("span", { children: "Loading..." }) });
};
const RestaurantModal = () => {
  const restaurantModalOnClose = useRestaurantModal.use.onClose();
  const restaurantModalIsOpen = useRestaurantModal.use.isOpen();
  const [loading, setLoading] = useState(false);
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    name: ""
  });
  const restaurantModalSetReset = useRestaurantModal.use.setReset();
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("restaurant.store"), {
      onStart: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        restaurantModalOnClose();
        restaurantModalSetReset(true);
        reset();
      },
      onError: () => {
        setLoading(false);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: "Créer un restaurant",
      description: "Ajouter un restaurant pour commencer à utiliser l'application.",
      isOpen: restaurantModalIsOpen,
      onClose: restaurantModalOnClose,
      children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-4 py-2 pb-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx("form", { onSubmit, children: loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          FormFieldLayout,
          {
            label: "Nom du restaurant",
            fieldName: "name",
            error: errors.name,
            children: /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                type: "text",
                name: "name",
                value: data2.name,
                className: "mt-1 block w-full py-3 border",
                autoComplete: "username",
                onChange: (e) => setData("name", e.target.value)
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 space-x-2 flex items-center justify-end w-full", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              disabled: loading,
              variant: "outline",
              onClick: restaurantModalOnClose,
              children: "Annuler"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              disabled: loading,
              type: "submit",
              children: "Continuer"
            }
          )
        ] })
      ] }) }) }) }) })
    }
  );
};
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(RestaurantModal, {}) });
};
function DashboardLayout({
  header,
  children
}) {
  const restaurantModalOnClose = useRestaurantModal.use.onClose();
  const props = usePage().props;
  props.auth.user;
  const flash = usePage().props.flash;
  useEffect(() => {
    restaurantModalOnClose();
  }, []);
  useEffect(() => {
    if (flash == null ? void 0 : flash.message) {
      setTimeout(() => {
        toast.success(flash.message);
      }, 500);
    }
    if (flash == null ? void 0 : flash.error) {
      setTimeout(() => {
        toast.error(flash.error);
      }, 500);
    }
  }, [flash == null ? void 0 : flash.message, flash == null ? void 0 : flash.error]);
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(ToastProvider, { children: [
    /* @__PURE__ */ jsx(ModalProvider, {}),
    /* @__PURE__ */ jsxs("main", { className: "w-full h-full flex flex-row relative", children: [
      /* @__PURE__ */ jsx(Navigation, {}),
      /* @__PURE__ */ jsxs("section", { className: "w-full ml-20", children: [
        /* @__PURE__ */ jsx(DashboardNavbar, {}),
        /* @__PURE__ */ jsxs("section", { className: "flex flex-col p-2 md:p-10 gap-5 relative z-0", children: [
          header,
          children
        ] })
      ] })
    ] })
  ] }) });
}
const Success$1 = ({ message }) => {
  return /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "bg-green-200 rounded-full p-1", children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-700" }) }),
    message
  ] });
};
const Error$1 = ({ message }) => {
  return /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsx("span", { className: "p-1 bg-destructive rounded-full", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 text-muted" }) }),
    message
  ] });
};
const ReservationStatus = ({ restaurant }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-0.5", children: [
    restaurant.accept_reservations ? /* @__PURE__ */ jsx(Success$1, { message: "Le module de réservation en ligne est activé" }) : /* @__PURE__ */ jsx(Error$1, { message: "Le module de réservation en ligne est désactivé" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "text-sm text-primaryBlue underline",
        href: route("dashboard.hours.index", {
          restaurant: restaurant.id
        }),
        children: "Modifier"
      }
    )
  ] });
};
const RestaurantStatus = ({ restaurant }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-0.5", children: [
    restaurant.active ? /* @__PURE__ */ jsx(Success$1, { message: "Le restaurant est en ligne" }) : /* @__PURE__ */ jsx(Error$1, { message: "Le restaurant est hors-ligne" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "text-sm text-primaryBlue underline",
        href: route("dashboard.settings.index", {
          restaurant: restaurant.id
        }),
        children: "Modifier"
      }
    )
  ] });
};
const MessageStatus = ({ restaurant }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-0.5", children: [
    restaurant.accept_messages ? /* @__PURE__ */ jsx(Success$1, { message: "Le module de contact en ligne est activé" }) : /* @__PURE__ */ jsx(Error$1, { message: "Le module de contact en ligne est désactivé" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "text-sm text-primaryBlue underline",
        href: route("dashboard.messages.index", {
          restaurant: restaurant.id
        }),
        children: "Modifier"
      }
    )
  ] });
};
const ServicesStatus = ({ restaurant }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-0.5", children: [
    restaurant.services.length === 0 ? /* @__PURE__ */ jsx(Error$1, { message: "Aucun horaire n'est indiqué" }) : /* @__PURE__ */ jsx(Success$1, { message: "Des horaires d'ouverture sont indiqués" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "text-sm text-primaryBlue underline",
        href: route("dashboard.hours.index", {
          restaurant: restaurant.id
        }),
        children: "Modifier"
      }
    )
  ] });
};
function LogoTomate(props) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "currentColor",
      ...props,
      viewBox: "0 0 117.023 146.394",
      children: /* @__PURE__ */ jsxs("g", { strokeLinecap: "round", transform: "translate(-3.414 -151.957)", children: [
        /* @__PURE__ */ jsxs(
          "g",
          {
            stroke: "#000",
            transform: "matrix(.447 -.36146 .52413 .64817 -34.396 133.61)",
            children: [
              /* @__PURE__ */ jsx(
                "rect",
                {
                  width: "14.865",
                  height: "65.89",
                  x: "150.359",
                  y: "67.329",
                  fill: "#2bbe69",
                  strokeWidth: "5.296",
                  ry: "0.319",
                  transform: "matrix(.87338 .48704 -.76087 .6489 0 0)"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "#2bbe69",
                  strokeWidth: "5.879",
                  d: "M26.573 159.04a31.239 53.784 0 01-14.718-71.698A31.239 53.784 0 0153.492 61.97a31.239 53.784 0 0114.757 71.674 31.239 53.784 0 01-41.623 25.44"
                }
              ),
              /* @__PURE__ */ jsx(
                "rect",
                {
                  width: "0.744",
                  height: "76.196",
                  x: "39.429",
                  y: "84.408",
                  fill: "green",
                  strokeWidth: "4.921",
                  ry: "0.328"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "red",
            stroke: "#000",
            strokeWidth: "4.095",
            d: "M37.574 291.656a56.462 47.184 0 01-26.602-62.9 56.462 47.184 0 0175.256-22.26 56.462 47.184 0 0126.672 62.88 56.462 47.184 0 01-75.23 22.318"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#593737",
            fillOpacity: "0.408",
            strokeWidth: "3.899",
            d: "M61.755 203.803a53.35 45.27 0 00-49.034 25.758 53.35 45.27 0 0025.135 60.349l.09.037a53.35 45.27 0 0037.408 2.67 51.266 43.502 0 01-25.04-4.031l-.087-.036a51.266 43.502 0 01-24.153-57.992 51.266 43.502 0 0151.533-24.423 53.35 45.27 0 00-15.852-2.332z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "none",
            stroke: "#000",
            strokeWidth: "3.339",
            d: "M-250.624-89.361a58.918 22.625 0 01-1.645 16.728",
            transform: "matrix(.06812 -.99768 -.99623 -.08679 0 0)"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#fff",
            strokeWidth: "2.043",
            d: "M19.027 231.476a21.596 18.028 0 0021.488 16.91 21.596 18.028 0 0021.612-16.8m2.013-.386a21.596 18.028 0 0021.488 16.91 21.596 18.028 0 0021.612-16.8"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "#000",
            strokeWidth: "2.83",
            d: "M39.65 239.169a3.348 3.385 0 01-1.578-4.513 3.348 3.385 0 014.463-1.597 3.348 3.385 0 011.582 4.511 3.348 3.385 0 01-4.462 1.601m46.179-.132a3.348 3.385 0 01-1.578-4.512 3.348 3.385 0 014.463-1.597 3.348 3.385 0 011.582 4.51 3.348 3.385 0 01-4.462 1.602"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "45.517",
            height: "4.013",
            x: "17.924",
            y: "228.623",
            strokeWidth: "5.567",
            ry: "0.29"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "45.517",
            height: "4.013",
            x: "63.698",
            y: "228.73",
            strokeWidth: "5.567",
            ry: "0.29"
          }
        )
      ] })
    }
  );
}
function PartySvg(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
      viewBox: "0 0 64 64",
      children: [
        /* @__PURE__ */ jsx("path", { fill: "#f7b600", d: "M2 61l8.6-3-6.5-3z" }),
        /* @__PURE__ */ jsx("path", { fill: "#ffdd7d", d: "M26.9 36.4L14.8 24.2l-2 5.6z" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#f7b600",
            d: "M12.8 29.8l-2.2 6.3 26.8 12.5 1.3-.4-11.8-11.8z"
          }
        ),
        /* @__PURE__ */ jsx("path", { fill: "#ffdd7d", d: "M8.5 42.4l20 9.3 8.9-3.1-26.8-12.5z" }),
        /* @__PURE__ */ jsx("path", { fill: "#f7b600", d: "M6.3 48.7l13.2 6.2 9-3.2-20-9.3z" }),
        /* @__PURE__ */ jsx("path", { fill: "#ffdd7d", d: "M6.3 48.7L4.1 55l6.5 3 8.9-3.1z" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#493816",
            d: "M31.9 31.2c6.7 6.6 10.2 14 7.8 16.4-2.5 2.4-9.9-1-16.7-7.7-6.7-6.6-10.2-14-7.8-16.4 2.5-2.4 9.9 1.1 16.7 7.7"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#42ade2",
            d: "M23.5 14.5c-1.6-2.3.1-3.3 2.3-2.9-2.1-2.5-.8-4.3 2.5-3.6 1 .2-.4 1.9-1.3 1.9 2.7 2 1.2 4.2-1.7 3.7 2.6 3.5-1.8 2.6-3.8 2.8C21 19 24 22 23 22c-2.2 0-5.8-8.3.5-7.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ff8736",
            d: "M44.5 19.3c-1.5.7-5.7-5.9-.5-6-3-2.7-2.6-4 1.4-4.1-4.6-4.6 2.7-6.2 3.4-3.8.2.7-2.2-.6-3 .7-.9 1.5 5.6 5.4-1.1 5.1 2.5 2.5 2.6 3.7-1.3 4.1.5.8 2.1 3.6 1.1 4"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ed4c5c",
            d: "M46.2 34.9l1.5-1.3s1.4 2.1 2.4 2.9c.8-3.6.6-5.7 4.7-3.3-2.3-6.2 1.5-3.9 5.2-2.2-.2-1.6 0-1.4 1.6-1.9 1.4 5.3-2.4 3.7-5.4 2 1.8 4.8-.1 4.5-3.9 2.9-.1 2-.7 4.3-1.9 4.5-1.4.4-4.2-3.6-4.2-3.6"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#c28fef",
            d: "M35 20.1c-1.8 2.4-4.7 3.7-6.8 5.8-2.2 2.2-3.5 8.2-3.5 8.2s.8-6.3 2.9-8.7c1.9-2.2 4.7-3.8 6.2-6.3 2.6-4.6.2-10.6-3.2-14.1.7-.6 1.7-1.4 2.2-2 3.3 4.1 6.1 12 2.2 17.1"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ff8736",
            d: "M38.1 25.2c-2.6 1.9-4.5 4.7-6.3 7.3-1.6 2.3-6.7 5.2-6.7 5.2s4.8-3.3 6.3-5.7c1.8-3 3.6-6.1 6.4-8.3 5.6-4.3 13.7-3.9 20-1.6-.4.9-1.1 2.8-1.1 2.8s-13.3-3.6-18.6.3"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#42ade2",
            d: "M49.2 24.7c-1.7 2.2-2.5 4.9-3.8 7.4-1.2 2.3-2.8 4.5-5.1 5.7-2.6 1.3-8.3.9-8.3.9s5.7-.1 8.1-1.7c2.4-1.6 3.7-4.4 4.6-7 1.8-5 4-10.4 9.2-12.6.3.9 1 2.8 1 2.8s-2.9.8-5.7 4.5M3.21 14.325l2.828-2.829 2.829 2.828-2.828 2.83z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ff8736",
            d: "M7.173 23.197L10 20.369l2.828 2.828L10 26.025z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ed4c5c",
            d: "M14.358 9.822l2.828-2.828 2.828 2.828-2.828 2.828z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#c28fef",
            d: "M45.205 43.696l2.828-2.829 2.828 2.829-2.828 2.828z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ed4c5c",
            d: "M38.903 53.39l2.828-2.828 2.829 2.829-2.829 2.828z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ff8736",
            d: "M51.279 55.607l2.828-2.829 2.828 2.829-2.828 2.828z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#42ade2",
            d: "M54.078 42.731l2.828-2.828 2.828 2.828-2.828 2.829zm-4.722-29.908l2.828-2.829 2.829 2.829-2.828 2.828z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#ed4c5c",
            d: "M19.044 29.792l2.829-2.828 2.828 2.828-2.828 2.829z"
          }
        )
      ]
    }
  );
}
const AlertBanner = (props) => {
  const { children } = props;
  return /* @__PURE__ */ jsxs("div", { className: "bg-destructive/20 text-destructive py-3 p-2 rounded-lg w-full my-3 flex items-center", children: [
    /* @__PURE__ */ jsx(LogoTomate, { className: "w-12 h-12" }),
    children
  ] });
};
const MissingInfoRestaurant = ({ restaurant }) => {
  return /* @__PURE__ */ jsx(AlertBanner, { children: /* @__PURE__ */ jsx("ul", { className: "list-disc pl-6", children: /* @__PURE__ */ jsxs("li", { children: [
    "Des informations nécessaires au fonctionnement des services sont manquantes. Veuillez les",
    " ",
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "underline text-primaryBlue",
        href: route("dashboard.settings.index", restaurant.id),
        children: "compléter"
      }
    ),
    "."
  ] }) }) });
};
const createSelectors$a = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useUser = createSelectors$a(create((set) => ({
  user: null,
  setUser: (user) => set({ user })
})));
const GoToFondatorPrices = ({
  disabled,
  variant,
  ...props
}) => {
  const v = variant ?? "default";
  const s = props.size ?? "md";
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: v,
      ...props,
      disabled,
      type: "button",
      size: s,
      onClick: () => {
        console.log("Go to fondator prices");
      },
      children: disabled ? /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "animate h-6 w-6 animate-spin" }) }) : /* @__PURE__ */ jsx(Fragment, { children: "Mettre à niveau" })
    }
  );
};
const ErrorMustBeFondator = (props) => {
  const { message, classNames: classNames2 } = props;
  return /* @__PURE__ */ jsxs("div", { className: cn("mt-1 flex items-center gap-1 p-1.5 border rounded-md bg-destructive/5", classNames2), children: [
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-sm tracking-tight", children: [
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-destructive p-1", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-muted" }) }),
      message
    ] }),
    /* @__PURE__ */ jsx(
      GoToFondatorPrices,
      {
        size: "xs",
        variant: "outline"
      }
    )
  ] });
};
const Dashboard = ({
  auth,
  flash,
  restaurants,
  restaurant: resto,
  isMissingInfo
}) => {
  const restaurant = resto.data;
  const user = useUser.use.user();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Dashboard de ${restaurant.name}` }),
    isMissingInfo && /* @__PURE__ */ jsx(MissingInfoRestaurant, { restaurant }),
    !isMissingInfo && /* @__PURE__ */ jsxs("div", { className: "md:col-start-3 bg-primaryBlue/20 border rounded-lg p-4 space-y-1.5", children: [
      /* @__PURE__ */ jsx(RestaurantStatus, { restaurant }),
      /* @__PURE__ */ jsx(MessageStatus, { restaurant }),
      /* @__PURE__ */ jsx(ReservationStatus, { restaurant }),
      /* @__PURE__ */ jsx(ServicesStatus, { restaurant }),
      !(user == null ? void 0 : user.isFondator) && /* @__PURE__ */ jsx(
        ErrorMustBeFondator,
        {
          classNames: "bg-background/60 justify-between",
          message: "Votre niveau d'abonnement ne vous permet pas de profiter pleinement de nos services."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-start gap-4", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl ", children: [
        "Dashboard de ",
        restaurant.name
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: restaurant.logo,
          alt: restaurant.name,
          className: "w-16 h-16 rounded-full"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-2", children: /* @__PURE__ */ jsx("div", { className: "md:col-span-2 bg-secondary", children: "Jour actuel, heure, prochain service + lien" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-80 border rounded bg-secondary/80 text-secondary-foreground stroke-current relative", children: /* @__PURE__ */ jsx(ChartBarIcon, { className: "stroke-inherit stroke-[0.75] min-w-8 w-8 absolute top-4 right-4" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-5 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "h-60 w-1/2 bg-secondary/80 border rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-60 w-1/2 bg-secondary/80 border rounded" })
    ] })
  ] });
};
Dashboard.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
function DateSegment({ segment, state }) {
  const ref = useRef(null);
  const {
    segmentProps: { ...segmentProps }
  } = useDateSegment(segment, state, ref);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...segmentProps,
      "aria-label": "Time Field",
      ref,
      className: cn(
        "focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none",
        segment.type !== "literal" ? "px-[1px]" : "",
        segment.isPlaceholder ? "text-muted-foreground" : ""
      ),
      children: segment.text
    }
  );
}
function TimeField(props) {
  const ref = useRef(null);
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale
  });
  const {
    fieldProps: { ...fieldProps },
    labelProps
  } = useTimeField(props, state, ref);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...fieldProps,
      "aria-label": "Time Field",
      ref,
      className: cn(
        "inline-flex h-10 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.isDisabled ? "cursor-not-allowed opacity-50" : ""
      ),
      children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(DateSegment, { segment, state }, i))
    }
  );
}
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      ref,
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;
const HoursModal = (props) => {
  const {
    isOpen,
    onClose,
    loading,
    title,
    description,
    id,
    restaurant,
    setLoading,
    can
  } = props;
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    day_id: id,
    services: [{ id: null, name: "", start_time: "", end_time: "" }]
  });
  const [services, setServices] = useState(data2.services);
  const addField = () => {
    setServices([
      ...services,
      { id: null, name: "", start_time: "", end_time: "" }
    ]);
    setData("services", [
      ...data2.services,
      { id: null, name: "", start_time: "", end_time: "" }
    ]);
  };
  const removeField = (index, serviceId) => {
    if (serviceId && !can.deleteRestaurantService) {
      toast.error("Vous n'avez pas la permission de supprimer ce service");
      return;
    }
    setServices((prevServices) => {
      const newFields = [...prevServices];
      newFields.splice(index, 1);
      return newFields;
    });
    setData((prevData) => {
      const newFields = [...prevData.services];
      newFields.splice(index, 1);
      return { ...prevData, services: newFields };
    });
  };
  const timeState = useDatePickerState({ granularity: "minute" });
  useEffect(() => {
    if (id !== null && id !== void 0) {
      axios.get(`/${restaurant.id}/getHoursByDayId/${id}`).then((res) => {
        const services2 = res.data.map((service) => ({
          id: service.id,
          name: service.name,
          start_time: service.start_time,
          end_time: service.end_time
        }));
        setData({
          services: services2,
          day_id: id
        });
        setLoading(false);
      }).catch((err) => {
      });
    }
  }, [id]);
  const submit = (e) => {
    e.preventDefault();
    post(route("dashboard.hours.store", { restaurant: restaurant.id }), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
        toast.success("Les horaires ont été enregistrés");
      },
      onError: (e2) => {
        toast.error("Une erreur s'est produite");
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title,
      description,
      isOpen,
      onClose,
      dialogContentClasses: "max-w-2xl",
      children: loading ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          data2.services.map((service, index) => /* @__PURE__ */ jsxs("div", { className: "", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-1 w-full", children: [
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  className: "w-full",
                  label: "Nom du service",
                  fieldName: service.name,
                  error: (
                    // @ts-ignore
                    errors == null ? void 0 : errors[`services.${index}.name`]
                  ),
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: service.name,
                      type: "text",
                      name: "name",
                      placeholder: "Nom du service",
                      value: service.name,
                      className: "mt-1 block w-full py-3 border",
                      onChange: (e) => {
                        const newFields = [
                          ...data2.services
                        ];
                        newFields[index].name = e.target.value;
                        setData(
                          "services",
                          newFields
                        );
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  className: "w-full",
                  fieldName: service.start_time,
                  error: (
                    // @ts-ignore
                    errors == null ? void 0 : errors[`services.${index}.start_time`]
                  ),
                  label: "Ouverture",
                  children: /* @__PURE__ */ jsx(
                    TimeField,
                    {
                      label: "Ouverture du restaurant",
                      value: formatHours(
                        service.start_time
                      ),
                      onChange: (value) => {
                        timeState.setTimeValue(
                          value
                        );
                        const { hour, minute } = value;
                        const time = `${hour.toString().padStart(
                          2,
                          "0"
                        )}:${minute.toString().padStart(2, "0")}:00`;
                        const newFields = [
                          ...data2.services
                        ];
                        newFields[index].start_time = time;
                        setData(
                          "services",
                          newFields
                        );
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  className: "w-full",
                  fieldName: service.end_time,
                  error: (
                    // @ts-ignore
                    errors == null ? void 0 : errors[`services.${index}.end_time`]
                  ),
                  label: "Fermeture",
                  children: /* @__PURE__ */ jsx(
                    TimeField,
                    {
                      label: "Fermeture du restaurant",
                      value: formatHours(
                        service.end_time
                      ),
                      onChange: (value) => {
                        timeState.setTimeValue(
                          value
                        );
                        const { hour, minute } = value;
                        const time = `${hour.toString().padStart(
                          2,
                          "0"
                        )}:${minute.toString().padStart(2, "0")}:00`;
                        const newFields = [
                          ...data2.services
                        ];
                        newFields[index].end_time = time;
                        setData(
                          "services",
                          newFields
                        );
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  onClick: () => removeField(index, service.id),
                  className: "h-10 text-destructive hover:text-destructive/80",
                  variant: "ghost",
                  children: /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(Separator, { className: "my-3" })
          ] }, index)),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              onClick: addField,
              size: "sm",
              variant: "secondary",
              className: "w-full flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                " Ajouter un service"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 space-x-2 flex items-center justify-end w-full", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              disabled: loading || processing,
              variant: "outline",
              onClick: onClose,
              children: "Annuler"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              disabled: processing || loading,
              children: "Confirmer"
            }
          )
        ] })
      ] }) })
    }
  );
};
const formatHours = (time) => {
  const [hourString, minuteString, secondString] = time.split(":");
  const timeObject = {
    hour: parseInt(hourString, 10),
    minute: parseInt(minuteString, 10),
    second: parseInt(secondString, 10),
    millisecond: 0
  };
  return timeObject;
};
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const tamponBefore$1 = [
  {
    id: 1,
    time: "00:00:00",
    label: "A l'heure de l'ouverture"
  },
  {
    id: 2,
    time: "00:15:00",
    label: "15 min après l'ouverture"
  },
  {
    id: 3,
    time: "00:30:00",
    label: "30 min après l'ouverture"
  },
  {
    id: 4,
    time: "00:45:00",
    label: "45 min après l'ouverture"
  },
  {
    id: 5,
    time: "01:00:00",
    label: "1h après l'ouverture"
  }
];
const tamponAfter = [
  {
    id: 1,
    time: "00:00:00",
    label: "A l'heure de la fermeture"
  },
  {
    id: 2,
    time: "00:15:00",
    label: "15 min avant la fermeture"
  },
  {
    id: 3,
    time: "00:30:00",
    label: "30 min avant la fermeture"
  },
  {
    id: 4,
    time: "00:45:00",
    label: "45 min avant la fermeture"
  },
  {
    id: 5,
    time: "01:00:00",
    label: "1h avant la fermeture"
  }
];
const SelectTamponService = ({ restaurant }) => {
  const [tampon, setTampon] = useState({
    time_before_service: restaurant.time_before_service ?? null,
    time_after_service: restaurant.time_after_service ?? null
  });
  const [errors, setErrors] = useState({
    time_before_service: "",
    time_after_service: ""
  });
  const submit = (newTampon) => {
    setErrors({
      time_before_service: "",
      time_after_service: ""
    });
    axios.put(`/dashboard/${restaurant.id}/hours/storeTamponDuration`, newTampon).then((response) => {
      console.log(response);
      toast.success("Horaires de service ajustés !");
    }).catch((error) => {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
      setErrors(error.response.data.errors);
    });
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "dashboard-05-chunk-3",
      className: "md:col-span-1 bg-accent h-fit",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Services" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Gérez le début et la fin de vos services par rapport aux heures d'ouverture." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "gap-2", children: [
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Début du service",
              fieldName: "table_id",
              error: errors.time_before_service ?? "",
              className: "w-full",
              children: /* @__PURE__ */ jsxs(
                Select,
                {
                  onValueChange: (e) => {
                    setTampon((prevTampon) => {
                      const newTampon = { ...prevTampon, time_before_service: e };
                      submit(newTampon);
                      return newTampon;
                    });
                  },
                  defaultValue: tampon.time_before_service ?? "00:00:00",
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(
                      SelectValue,
                      {
                        placeholder: "Début du service"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(SelectContent, { id: "table", children: tamponBefore$1.map((item) => /* @__PURE__ */ jsx(
                      SelectItem,
                      {
                        value: item.time,
                        children: item.label
                      },
                      item.id
                    )) })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              className: "w-full",
              label: "Fin du service",
              fieldName: "table_id",
              error: errors.time_after_service ?? "",
              children: /* @__PURE__ */ jsxs(
                Select,
                {
                  onValueChange: (e) => {
                    setTampon((prevTampon) => {
                      const newTampon = { ...prevTampon, time_after_service: e };
                      submit(newTampon);
                      return newTampon;
                    });
                  },
                  defaultValue: tampon.time_after_service ?? "00:00:00",
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(
                      SelectValue,
                      {
                        placeholder: "Fin du service"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(SelectContent, { id: "table", children: tamponAfter.map((item) => /* @__PURE__ */ jsx(
                      SelectItem,
                      {
                        value: item.time,
                        children: item.label
                      },
                      item.id
                    )) })
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SelectTamponService
}, Symbol.toStringTag, { value: "Module" }));
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  const formattedHours = parseInt(hours, 10);
  const formattedHoursString = formattedHours < 10 ? `0${formattedHours}` : formattedHours;
  return `${formattedHoursString}h${minutes}`;
}
const OpeningHours = ({ openForm, days: days2, hours }) => {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "dashboard-05-chunk-3",
      className: "md:col-span-2 bg-accent",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Heures d'ouvertures" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Gérer vos jours et heures d'ouvertures." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { className: "bg-background", children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { children: "Jour de la semaine" }),
            /* @__PURE__ */ jsx(TableHead, { className: "hidden sm:table-cell", children: "Créneaux d'ouverture" }),
            /* @__PURE__ */ jsx(TableHead, { className: "sr-only", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: Object.values(hours).map((day) => /* @__PURE__ */ jsxs(
            TableRow,
            {
              className: "bg-background",
              children: [
                /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "font-medium", children: day.day_name }) }),
                /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell space-x-0.5", children: day.services.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: day.services.map(
                  (service, index) => /* @__PURE__ */ jsxs(
                    Badge,
                    {
                      className: "text-xs",
                      variant: "secondary",
                      children: [
                        formatTime(
                          service.start_time
                        ),
                        "/",
                        formatTime(
                          service.end_time
                        )
                      ]
                    },
                    index
                  )
                ) }) : /* @__PURE__ */ jsx("p", { children: "Fermé" }) }),
                /* @__PURE__ */ jsx(TableCell, { className: "table-cell text-right", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: () => openForm(day.day_id, day.day_name),
                    variant: "ghost",
                    size: "sm",
                    children: /* @__PURE__ */ jsx(Edit$2, { className: "w-4 h-4" })
                  }
                ) })
              ]
            },
            day.day_id
          )) })
        ] }) })
      ]
    }
  );
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OpeningHours
}, Symbol.toStringTag, { value: "Module" }));
const tamponBefore = [
  {
    id: 1,
    time: "00:00:00",
    label: "Jusqu'à l'ouverture"
  },
  {
    id: 2,
    time: "00:15:00",
    label: "15 min avant l'ouverture"
  },
  {
    id: 3,
    time: "00:30:00",
    label: "30 min avant l'ouverture"
  },
  {
    id: 4,
    time: "00:45:00",
    label: "45 min avant l'ouverture"
  },
  {
    id: 5,
    time: "01:00:00",
    label: "1h avant l'ouverture"
  },
  {
    id: 6,
    time: "01:30:00",
    label: "1h30 avant l'ouverture"
  },
  {
    id: 7,
    time: "02:00:00",
    label: "2h avant l'ouverture"
  }
];
const StopReservation = ({ restaurant }) => {
  const [tampon, setTampon] = useState({
    time_to_stop_reservation: restaurant.time_to_stop_reservation ?? null
  });
  const [errors, setErrors] = useState({
    time_to_stop_reservation: ""
  });
  const submit = (timeStopReservation) => {
    setErrors({
      time_to_stop_reservation: ""
    });
    axios.put(`/dashboard/${restaurant.id}/hours/storeEndReservation`, timeStopReservation).then((response) => {
      toast.success("Paramètre enregistré !");
    }).catch((error) => {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard");
      setErrors(error.response.data.errors);
    });
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "dashboard-05-chunk-3",
      className: "md:col-span-1 bg-accent h-fit",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Arrêt des réservations" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Indiquez combien de temps avant un service, les réservations doivent s'arrêter." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "gap-2", children: /* @__PURE__ */ jsx(
          FormFieldLayout,
          {
            label: "Fin des réservations",
            fieldName: "time_to_stop_reservation",
            error: errors.time_to_stop_reservation ?? "",
            className: "w-full",
            children: /* @__PURE__ */ jsxs(
              Select,
              {
                onValueChange: (e) => {
                  setTampon((prevHours) => {
                    const newTampon = { ...prevHours, time_to_stop_reservation: e };
                    submit(newTampon);
                    return newTampon;
                  });
                },
                defaultValue: tampon.time_to_stop_reservation ?? "00:00:00",
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(
                    SelectValue,
                    {
                      placeholder: "Fin des réservations"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(SelectContent, { id: "table", children: tamponBefore.map((item) => /* @__PURE__ */ jsx(
                    SelectItem,
                    {
                      value: item.time,
                      children: item.label
                    },
                    item.id
                  )) })
                ]
              }
            )
          }
        ) })
      ]
    }
  );
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StopReservation
}, Symbol.toStringTag, { value: "Module" }));
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
const AcceptReservation = (props) => {
  const { restaurant } = props;
  const [loading, setLoading] = useState(false);
  const [acceptReservation, setAcceptReservation] = useState(
    restaurant.accept_reservations
  );
  const [errors, setErrors] = useState({
    accept_reservations: ""
  });
  const submit = (e) => {
    setLoading(true);
    setErrors({
      accept_reservations: ""
    });
    axios.put(`/dashboard/${restaurant.id}/reservation/status`, {
      accept_reservations: e
    }).then((response) => {
      toast.success("Statut modifié !");
      router.reload();
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  const copy = () => {
    navigator.clipboard.writeText((restaurant == null ? void 0 : restaurant.restaurant_link_book_form) ?? "");
    toast.success("Lien copié !");
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "dashboard-05-chunk-3",
      className: "md:col-span-1 bg-accent h-fit",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Statut du formulaire de réservation" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Activer ou désactiver le formulaire de réservation en ligne de votre restaurant." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "gap-2", children: [
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Activer les réservations en ligne ?",
              fieldName: "name",
              className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4\n                    bg-background space-y-0\n                    ",
              error: errors.accept_reservations,
              children: /* @__PURE__ */ jsx(
                Switch,
                {
                  checked: acceptReservation,
                  onCheckedChange: (e) => {
                    setAcceptReservation(() => {
                      submit(e);
                      return e;
                    });
                  }
                }
              )
            }
          ),
          restaurant.accept_reservations == true && restaurant.restaurant_link_book_form && /* @__PURE__ */ jsxs("div", { className: "text-sm mt-5 flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "link",
                onClick: () => {
                  window.open(
                    restaurant.restaurant_link_book_form,
                    "_blank"
                  );
                },
                children: /* @__PURE__ */ jsxs("span", { className: "flex gap-2 items-center", children: [
                  " ",
                  "Voir le formulaire",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-inherit" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                className: "flex gap-2 items-center",
                variant: "outline",
                onClick: copy,
                children: [
                  "Copier le lien",
                  /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4 text-inherit" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AcceptReservation
}, Symbol.toStringTag, { value: "Module" }));
const Hours = ({ restaurant: resto, auth, days: days2, hours, can }) => {
  const restaurant = resto.data;
  const [open, setOpen] = React__default.useState(false);
  const [id, setId] = React__default.useState();
  const [dayName, setDayName] = React__default.useState("");
  const [loadingModal, setLoadingModal] = React__default.useState(false);
  const openForm = (id2, name) => {
    setOpen(true);
    setLoadingModal(true);
    setId(id2);
    setDayName(name);
  };
  const closeModal = () => {
    setOpen(false);
    setLoadingModal(false);
    setId(null);
    setDayName("");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      HoursModal,
      {
        title: `Modifier les horaires du ${dayName}`,
        description: "",
        isOpen: open,
        onClose: closeModal,
        loading: loadingModal,
        setLoading: setLoadingModal,
        id,
        restaurant,
        can
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-3 gap-3 space-y-2 md:space-y-0", children: [
      /* @__PURE__ */ jsx(OpeningHours, { openForm, days: days2, hours }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(AcceptReservation, { restaurant }),
        /* @__PURE__ */ jsx(SelectTamponService, { restaurant }),
        /* @__PURE__ */ jsx(StopReservation, { restaurant })
      ] })
    ] })
  ] });
};
Hours.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hours
}, Symbol.toStringTag, { value: "Module" }));
const createSelectors$9 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useSelectedMessage = createSelectors$9(create((set) => ({
  messageId: null,
  setMessageId: (messageId) => set(() => ({ messageId }))
})));
const SelectedMessage = (props) => {
  const { restaurant } = props;
  const selectedMessage = useSelectedMessage.use.messageId();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Adresse mail copié");
  };
  useEffect(() => {
    function getMessageById() {
      axios.get(`/${restaurant.id}/message/${selectedMessage}/`).then((response) => {
        setMessage(response.data.data.message);
      }).catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false));
      setLoading(false);
    }
    if (selectedMessage) {
      setLoading(true);
      getMessageById();
    }
  }, [selectedMessage]);
  return /* @__PURE__ */ jsx("div", { className: "px-4", children: loading ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Loader, {}) }) : message ? /* @__PURE__ */ jsx(Fragment, { children: message ? /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h2", { children: [
        /* @__PURE__ */ jsx("span", { className: "underline font-semibold", children: "De la part de :" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { children: [
          message.last_name,
          " ",
          message.first_name
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "", children: [
        /* @__PURE__ */ jsx("span", { className: "underline font-semibold", children: "Adresse mail :" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center md:gap-3 flex-wrap gap-2", children: [
          message.email,
          /* @__PURE__ */ jsx(
            "span",
            {
              onClick: () => onCopy(message.email),
              className: "hover:bg-secondary transition-colors cursor-pointer md:p-2 rounded",
              children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("span", { className: "underline font-semibold", children: "Date" }),
        " ",
        ": ",
        format(message.created_at, "EEEE dd MMMM yyyy", { locale: fr })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("span", { className: "underline font-semibold", children: "Objet" }),
        " ",
        ": ",
        message.subject
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("span", { className: "underline font-semibold", children: "Message" }),
      " ",
      ": ",
      /* @__PURE__ */ jsx("br", {}),
      " ",
      message.content
    ] })
  ] }) : /* @__PURE__ */ jsx("div", { children: "Pas de message sélectionné" }) }) : /* @__PURE__ */ jsx("div", { children: "Pas de message sélectionné" }) });
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SelectedMessage
}, Symbol.toStringTag, { value: "Module" }));
const CustomInertiaLink = ({ className, ref, href, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      className,
      href: href ?? "",
      ref,
      ...props
    }
  );
};
const Pagination$1 = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: cn("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination$1.displayName = "Pagination";
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ul",
  {
    ref,
    className: cn("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("li", { ref, className: cn("", className), ...props }));
PaginationItem.displayName = "PaginationItem";
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => (
  // @ts-ignore
  /* @__PURE__ */ jsx(
    CustomInertiaLink,
    {
      href: props.href,
      "aria-current": isActive ? "page" : void 0,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props
    }
  )
);
PaginationLink.displayName = "PaginationLink";
const PaginationPrevious = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: cn("gap-1 pl-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { children: "Précédent" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
const PaginationNext = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxs(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: cn("gap-1 pr-2.5", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { children: "Suivant" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";
const useToastErrorNotFondator = () => {
  const showErrorToast = (props) => {
    const { message, action } = props;
    toast.error(message, {
      action: {
        label: action,
        onClick: () => {
        }
      }
    });
  };
  return { showErrorToast };
};
const EnableDisableContactMessage = (props) => {
  const { restaurant, can } = props;
  const user = useUser.use.user();
  const [loading, setLoading] = useState(false);
  const [acceptMessages, setAcceptMessages] = useState(
    restaurant.accept_messages
  );
  const [errors, setErrors] = useState({
    accept_messages: ""
  });
  const submit = (e) => {
    if (!can.enableMessages || !(user == null ? void 0 : user.isFondator)) {
      toast.error("Vous n'avez pas la permission de modifier ce paramètre");
      return;
    }
    setLoading(true);
    setErrors({
      accept_messages: ""
    });
    axios.put(`/dashboard/${restaurant.id}/messages/status`, {
      accept_messages: e
    }).then((response) => {
      toast.success("Statut modifié !");
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  const { showErrorToast } = useToastErrorNotFondator();
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "settings-messages",
      className: "md:col-span-1 bg-accent h-fit",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7 py-3", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-md", children: "Formulaire de contact" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Activer ou désactiver le formulaire de contact en ligne de votre restaurant." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "gap-2", children: [
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Activer le formulaire de contact ?",
              fieldName: "accept_messages",
              className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4\n            bg-background space-y-0\n            ",
              error: (errors == null ? void 0 : errors.accept_messages) ?? "",
              children: /* @__PURE__ */ jsx(
                Switch,
                {
                  disabled: loading || !can.enableMessages,
                  checked: acceptMessages,
                  onCheckedChange: (e) => {
                    if (!(user == null ? void 0 : user.isFondator)) {
                      showErrorToast({
                        message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                        action: "Mettre à niveau"
                      });
                      return;
                    }
                    if (!can.enableMessages) {
                      toast.error("Vous n'avez pas la permission de modifier ce paramètre");
                      return;
                    }
                    setAcceptMessages(() => {
                      submit(e);
                      return e;
                    });
                  }
                }
              )
            }
          ),
          !(user == null ? void 0 : user.isFondator) && /* @__PURE__ */ jsx(ErrorMustBeFondator, { message: "Il faut être abonné pour pouvoir activer le système de contact." })
        ] })
      ]
    }
  );
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EnableDisableContactMessage
}, Symbol.toStringTag, { value: "Module" }));
const Messages = (props) => {
  const { messages, restaurant, can } = props;
  const setSelectMessageId = useSelectedMessage.use.setMessageId();
  return /* @__PURE__ */ jsxs("div", { className: " px-4 md:px-0 grid  md:grid-cols-3  md:divide-x md:divide-background-foreground min-h-[calc(100vh-6.5rem)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid md:col-span-1 h-full pr-1 space-y-3", children: [
      /* @__PURE__ */ jsx(EnableDisableContactMessage, { restaurant: restaurant.data, can }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Vos messages reçus" }),
        /* @__PURE__ */ jsx("div", { className: "pt-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("small", { className: " md:w-24 w-20", children: "Nom" }),
          /* @__PURE__ */ jsx("small", { className: " md:w-24 w-20", children: "Sujet" }),
          /* @__PURE__ */ jsx("small", { className: " md:w-24 w-20", children: "Date" })
        ] }) }),
        messages.data.map((message) => /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => {
              setSelectMessageId(message.id);
            },
            className: "px-1 py-0.5 md:px-3 md:py-2.5 mb-1.5 bg-secondary/50 hover:bg-secondary transition-colors rounded-lg",
            children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("small", { className: "truncate md:w-24 w-20", children: [
                message.last_name,
                " ",
                message.first_name
              ] }),
              /* @__PURE__ */ jsx("small", { className: "truncate md:w-24 w-20", children: message.subject }),
              /* @__PURE__ */ jsx("small", { className: "truncate md:w-24 w-20", children: format(
                message.created_at,
                "dd MMMM yyyy",
                {
                  locale: fr
                }
              ) })
            ] })
          },
          message.id
        )),
        /* @__PURE__ */ jsx("div", { className: "mt-4 w-full mx-auto ", children: /* @__PURE__ */ jsx(Pagination$1, { children: /* @__PURE__ */ jsxs(PaginationContent, { className: "flex items-center justify-between w-full", children: [
          messages.meta.links.map((link, index) => {
            const labelNumber = Number(link.label);
            if (isNaN(labelNumber)) {
              return link.label === "&laquo; Previous" && /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
                PaginationPrevious,
                {
                  className: cn(
                    !link.url ? "cursor-default text-muted hover:bg-background hover:text-muted" : ""
                  ),
                  href: link.url
                }
              ) }, index);
            }
          }),
          /* @__PURE__ */ jsxs("small", { children: [
            messages.meta.current_page,
            " /",
            " ",
            messages.meta.last_page
          ] }),
          messages.meta.links.map((link, index) => {
            const labelNumber = Number(link.label);
            if (isNaN(labelNumber)) {
              return link.label !== "&laquo; Previous" && /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
                PaginationNext,
                {
                  href: link.url,
                  className: cn(
                    !link.url ? "cursor-default text-muted hover:bg-background hover:text-muted" : ""
                  )
                }
              ) }, index);
            }
          })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:col-span-2", children: /* @__PURE__ */ jsx(SelectedMessage, { restaurant: restaurant.data }) })
  ] });
};
Messages.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Messages
}, Symbol.toStringTag, { value: "Module" }));
const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title,
      description,
      isOpen,
      onClose,
      children: /* @__PURE__ */ jsxs("div", { className: "pt-6 space-x-2 flex items-center justify-end w-full", children: [
        /* @__PURE__ */ jsx(Button, { disabled: loading, variant: "outline", onClick: onClose, children: "Annuler" }),
        /* @__PURE__ */ jsx(Button, { disabled: loading, variant: "destructive", onClick: onConfirm, children: "Confirmer" })
      ] })
    }
  );
};
const CellAction$1 = ({
  data: data2,
  can,
  restaurant
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onConfirm = async () => {
    if (!can.unsubscribe) {
      toast.error(
        "Vous n'avez pas la permission de supprimer cet utilisateur"
      );
      return;
    }
    if (!restaurant)
      return;
    try {
      setLoading(true);
      await axios.post(`/dashboard/${restaurant.id}/newsletter`, {
        id: data2.id
      });
      toast.success("Utilisateur désinscrit");
      router.reload();
    } catch (error) {
      console.log(error);
      toast.error(
        "Une erreur s'est produite lors de la suppression de l'utilisateur"
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AlertModal,
      {
        isOpen: open,
        onClose: () => setOpen(false),
        onConfirm,
        loading,
        title: "Supression de la table",
        description: "Êtes-vous sûr de vouloir supprimer cette table ? Cette action est irréversible."
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open menu" }),
        /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
        can.unsubscribe && /* @__PURE__ */ jsxs(
          DropdownMenuItem,
          {
            className: "flex items-center gap-1 cursor-pointer text-destructive focus:text-red-600",
            onClick: () => setOpen(true),
            children: [
              /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" }),
              "Désinscrire"
            ]
          }
        )
      ] })
    ] })
  ] });
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CellAction: CellAction$1
}, Symbol.toStringTag, { value: "Module" }));
const getTableColumns$1 = (props) => {
  const { can, restaurant } = props;
  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Adresse mail copié");
  };
  const tablesColumns = [
    {
      accessorKey: "email",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              "Email",
              /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
            ]
          }
        );
      },
      cell: ({ row }) => {
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("p", { children: row.original.email }),
          /* @__PURE__ */ jsx(
            "span",
            {
              onClick: () => onCopy(row.original.email),
              className: "hover:bg-secondary transition-colors cursor-pointer md:p-2 rounded",
              children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" })
            }
          )
        ] });
      }
    },
    {
      accessorKey: "subscribed_at",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              "Date d'inscription",
              /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
            ]
          }
        );
      },
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx("div", { children: format(row.original.subscribed_at, "dd MMMM yyyy", {
          locale: fr
        }) });
      }
    },
    {
      id: "actions",
      cell: ({ row }) => /* @__PURE__ */ jsx(CellAction$1, { data: row.original, can, restaurant })
    }
  ];
  return tablesColumns;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTableColumns: getTableColumns$1
}, Symbol.toStringTag, { value: "Module" }));
function DataNewsletterUserTables({
  columns,
  data: data2,
  meta
}) {
  var _a;
  const [sorting, setSorting] = React__default.useState([]);
  const table = useReactTable({
    data: data2,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
          header.column.columnDef.header,
          header.getContext()
        ) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No results."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      meta.links.map((link, index) => {
        const labelNumber = Number(link.label);
        if (isNaN(labelNumber)) {
          return link.label === "&laquo; Previous" && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                router.visit(link.url);
              },
              disabled: !link.url,
              children: "Précédent"
            },
            index
          );
        }
      }),
      /* @__PURE__ */ jsxs("small", { children: [
        meta.current_page,
        " / ",
        meta.last_page
      ] }),
      meta.links.map((link, index) => {
        const labelNumber = Number(link.label);
        if (isNaN(labelNumber)) {
          return link.label !== "&laquo; Previous" && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => {
                router.visit(link.url);
              },
              disabled: !link.url,
              children: "Suivant"
            },
            index
          );
        }
      })
    ] })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DataNewsletterUserTables
}, Symbol.toStringTag, { value: "Module" }));
const Users = (props) => {
  const { users, can, restaurant, countUser } = props;
  const tableColumns = getTableColumns$1({
    can,
    restaurant: restaurant.data
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-semibold tracking-wide p-2", children: [
      "Utilisateurs inscrits à la newsletter",
      /* @__PURE__ */ jsxs("span", { className: "text-xl", children: [
        " ",
        "(",
        countUser,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      DataNewsletterUserTables,
      {
        columns: tableColumns,
        data: users.data,
        meta: users.meta
      }
    )
  ] });
};
Users.layout = (page) => {
  return /* @__PURE__ */ jsx(
    DashboardLayout,
    {
      children: page
    }
  );
};
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users
}, Symbol.toStringTag, { value: "Module" }));
const BookingButton = (props) => {
  const { restaurant, title } = props;
  return /* @__PURE__ */ jsxs(
    m.button,
    {
      className: "px-8 py-4 rounded-lg relative\n    radial-gradient\n    ",
      initial: {
        "--x": "100%"
      },
      animate: {
        "--x": "-100%"
      },
      whileTap: {
        scale: 0.97
      },
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1
        }
      },
      onClick: () => {
        router.visit("/book/" + restaurant.id);
      },
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-neutral-100 tracking-wide font-light\n        h-full w-full block relative linear-mask\n        ",
            children: title
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "block absolute inset-0 rounded-md p-px linear-overlay" })
      ]
    }
  );
};
const MenuCard = (props) => {
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "card-description",
      className: "bg-background h-fit w-full shadow",
      children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-7", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Découvrez notre carte" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-primaryBlue underline leading-6 tracking-tight", children: "Voir" }) })
      ]
    }
  );
};
const __vite_glob_0_65 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MenuCard
}, Symbol.toStringTag, { value: "Module" }));
const createSelectors$8 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useContactRestaurantModal = createSelectors$8(create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  restaurant: null,
  setRestaurant: (restaurant) => set({ restaurant })
})));
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const ContactRestaurant = () => {
  const contactModalOnClose = useContactRestaurantModal.use.onClose();
  const contactModalIsOpen = useContactRestaurantModal.use.isOpen();
  useContactRestaurantModal.use.setRestaurant();
  const contactModalRestaurant = useContactRestaurantModal.use.restaurant();
  const [loading, setLoading] = useState(false);
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    subject: "",
    content: "",
    restaurant_id: contactModalRestaurant == null ? void 0 : contactModalRestaurant.id
  });
  useEffect(() => {
    if (contactModalRestaurant) {
      setData("restaurant_id", contactModalRestaurant.id);
    }
  }, [contactModalRestaurant]);
  const onSubmit = (e) => {
    e.preventDefault();
    post(route("message.send"), {
      onStart: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        contactModalOnClose();
        reset();
        toast.success("Message envoyé avec succès.");
      },
      onError: (e2) => {
        setLoading(false);
        console.log(errors, e2);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      dialogTitleClasses: "text-xl text-primary/80",
      title: `Contacter le restaurant ${contactModalRestaurant == null ? void 0 : contactModalRestaurant.name}`,
      isOpen: contactModalIsOpen,
      onClose: contactModalOnClose,
      children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-4 py-2 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "text-md font-semibold\n                        flex items-center justify-center gap-3\n                        ",
            children: [
              /* @__PURE__ */ jsx(
                MessageCircle,
                {
                  className: "\n                        transform scale-x-[-1] text-neutral-600\n                        h-6 w-6 "
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Par message" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("form", { onSubmit, children: loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1", children: [
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  label: "Nom",
                  fieldName: "last_name",
                  error: errors.last_name,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "last_name",
                      type: "text",
                      name: "last_name",
                      placeholder: "Votre nom",
                      value: data2.last_name,
                      className: "mt-1 block w-full py-3 border",
                      onChange: (e) => setData(
                        "last_name",
                        e.target.value
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  label: "Prénom",
                  fieldName: "first_name",
                  error: errors.first_name,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "first_name",
                      type: "text",
                      name: "first_name",
                      placeholder: "Votre prénom",
                      value: data2.first_name,
                      className: "mt-1 block w-full py-3 border",
                      onChange: (e) => setData(
                        "first_name",
                        e.target.value
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1", children: [
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  label: "Mail",
                  fieldName: "email",
                  error: errors.email,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      type: "mail",
                      name: "email",
                      placeholder: "Votre adresse mail",
                      value: data2.email,
                      className: "mt-1 block w-full py-3 border",
                      onChange: (e) => setData(
                        "email",
                        e.target.value
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                FormFieldLayout,
                {
                  label: "Téléphone",
                  fieldName: "phone",
                  error: errors.phone,
                  children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "phone",
                      type: "text",
                      name: "phone",
                      placeholder: "Votre numéro de téléphone",
                      value: data2.phone,
                      className: "mt-1 block w-full py-3 border",
                      onChange: (e) => setData(
                        "phone",
                        e.target.value
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Sujet",
                fieldName: "subject",
                error: errors.subject,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "subject",
                    type: "text",
                    name: "subject",
                    placeholder: "Sujet de votre message",
                    value: data2.subject,
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => setData(
                      "subject",
                      e.target.value
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Message",
                fieldName: "content",
                error: errors.content,
                children: /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    placeholder: "Contenu de votre message",
                    className: "resize-none",
                    onChange: (e) => {
                      setData(
                        "content",
                        e.target.value
                      );
                    }
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-6 space-x-2 flex items-center justify-center w-full", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                className: "w-full",
                disabled: loading,
                variant: "outline",
                onClick: contactModalOnClose,
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsx(
              SubmitButton,
              {
                disabled: loading || processing,
                variant: "primaryBlue",
                className: "w-full  text-white",
                type: "submit",
                children: "Envoyer"
              }
            )
          ] })
        ] }) }),
        contactModalRestaurant && contactModalRestaurant.phone && /* @__PURE__ */ jsxs("div", { className: "w-full text-center tracking-wide", children: [
          /* @__PURE__ */ jsx("p", { className: "", children: "OU" }),
          /* @__PURE__ */ jsxs(
            "h2",
            {
              className: "text-md font-semibold\n                         flex items-center justify-center gap-3\n                         ",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-neutral-600" }),
                /* @__PURE__ */ jsx("span", { children: "Par téléphone" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: `tel:${contactModalRestaurant == null ? void 0 : contactModalRestaurant.phone}`,
              className: "text-primaryBlue underline",
              children: contactModalRestaurant == null ? void 0 : contactModalRestaurant.phone
            }
          ) })
        ] })
      ] }) }) })
    }
  );
};
const ContactButton = (props) => {
  const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
  const contactModalSetRestaurant = useContactRestaurantModal.use.setRestaurant();
  const { restaurant, variant = "primaryBlue" } = props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ContactRestaurant, {}),
    /* @__PURE__ */ jsxs(
      Button,
      {
        variant,
        className: "w-full col-span-3 text-white flex items-center gap-2",
        type: "button",
        onClick: () => {
          contactModalOnOpen();
          contactModalSetRestaurant(restaurant);
        },
        children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(MessageSquare, { className: "" }) }),
          /* @__PURE__ */ jsx("span", { children: "Contacter le restaurant" })
        ]
      }
    )
  ] });
};
const ContactCard = (props) => {
  const { restaurant } = props;
  const onCopy = ({ id, text }) => {
    if (id) {
      navigator.clipboard.writeText(id);
      toast.success(text);
    }
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "card-description",
      className: "bg-background h-fit w-full shadow",
      children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-7", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Nous contacter" }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium underline", children: "Notre adresse :" }),
              " ",
              restaurant.address,
              ", ",
              restaurant.zip,
              ",",
              " ",
              restaurant.city
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium underline", children: "Téléphone :" }),
              " ",
              restaurant.phone,
              " ",
              restaurant.phone && /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(
                Copy,
                {
                  onClick: () => onCopy({
                    id: restaurant.phone ?? "",
                    text: "Numéro de téléphone copié"
                  }),
                  className: "w-4 h-4 text-primary/90 cursor-pointer"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium underline", children: "Mail :" }),
              " ",
              restaurant.email,
              " ",
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(
                Copy,
                {
                  onClick: () => onCopy({
                    id: restaurant.email ?? "",
                    text: "Mail copié"
                  }),
                  className: "w-4 h-4 text-primary/90 cursor-pointer"
                }
              ) })
            ] })
          ] }),
          restaurant.accept_messages === true && /* @__PURE__ */ jsx(ContactButton, { restaurant, variant: "default" })
        ] })
      ]
    }
  );
};
const __vite_glob_0_62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContactCard
}, Symbol.toStringTag, { value: "Module" }));
const NewsletterCard = (props) => {
  const { restaurant } = props;
  const {
    data: data2,
    setData,
    post,
    processing,
    errors,
    reset
  } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("newsletter.subscribe", { restaurant: restaurant.id }), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toast.success("Vous êtes bien inscrit à notre newsletter, merci !");
      },
      onError: () => {
        toast.error("Une erreur est survenue.");
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "card-newsletter",
      className: "bg-background h-fit w-full shadow",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Newsletter" }),
          /* @__PURE__ */ jsx("p", { className: "text-[14px] tracking-tight", children: "Inscrivez-vous à notre newsletter pour rester informé de notre actualité." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsx(
          FormFieldLayout,
          {
            label: "Votre mail",
            fieldName: "email",
            error: errors.email,
            children: /* @__PURE__ */ jsxs("div", { className: "w-full h-fit relative", children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "email",
                  className: "w-full h-11 rounded-3xl",
                  value: data2.email,
                  onChange: (e) => setData("email", e.target.value)
                }
              ),
              /* @__PURE__ */ jsx(
                SubmitButton,
                {
                  disabled: processing,
                  type: "button",
                  onClick: submit,
                  className: "absolute right-1 top-1/2 -translate-y-1/2 h-9 rounded-3xl",
                  children: "Enregistrer"
                }
              )
            ] })
          }
        ) }) })
      ]
    }
  );
};
const __vite_glob_0_66 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NewsletterCard
}, Symbol.toStringTag, { value: "Module" }));
const DescriptionCard = (props) => {
  const { restaurant } = props;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "card-description",
      className: "bg-background h-fit w-full shadow",
      children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-7", children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg", children: [
          "A propos du restaurant ",
          restaurant.name
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", { className: "text-primary/80 leading-6 tracking-tight", children: restaurant.description }) })
      ]
    }
  );
};
const __vite_glob_0_63 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DescriptionCard
}, Symbol.toStringTag, { value: "Module" }));
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const formatRating = (rating) => {
  return rating !== void 0 ? rating.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "Pas encore de note";
};
const Avis$1 = (props) => {
  const { restaurant, avis } = props;
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: avis && avis.data && avis.data.map((avis2) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-medium", children: [
      formatRating(avis2.average),
      " ",
      /* @__PURE__ */ jsx(Star$1, { className: "w-4 h-4 fill-neutral-900" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[14px]", children: avis2.comment }),
      /* @__PURE__ */ jsx("small", { className: "text-muted-foreground", children: format(new Date(avis2.created_at), "dd/MM/yyyy") })
    ] }),
    /* @__PURE__ */ jsx(Separator, { className: "my-2" })
  ] }, avis2.id)) });
};
const __vite_glob_0_68 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Avis$1
}, Symbol.toStringTag, { value: "Module" }));
const Note$1 = (props) => {
  const { restaurant } = props;
  const rating = restaurant.rating;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-6 border rounded-md overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          backgroundImage: "radial-gradient(200% 140% at 60% 0%, #020617 50%, hsl(var(--primary-blue)))"
        },
        className: "bg-primary col-span-2 w-full text-primary-foreground\n        flex items-center justify-center\n        ",
        children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-medium tracking-wide", children: rating.averageRating ? formatRating(rating.averageRating) : "0" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "col-span-4 bg-secondary text-sm tracking-tight leading-6 text-muted-foreground h-fit", children: [
      /* @__PURE__ */ jsx("ul", { className: "p-3", children: rating.itemsRating && Object.entries(rating.itemsRating).map(([itemName, ratingData]) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "flex items-end gap-3",
          children: [
            /* @__PURE__ */ jsx("span", { className: "tracking-tighter", children: itemName }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block align-text-bottom", children: formatRating(ratingData.average) }),
              /* @__PURE__ */ jsx("span", { className: "mb-0.5", children: /* @__PURE__ */ jsx(Star$1, { className: "w-3 h-3 fill-neutral-900" }) })
            ] })
          ]
        },
        itemName
      )) }),
      /* @__PURE__ */ jsx("div", { className: "w-full text-center pb-2.5", children: /* @__PURE__ */ jsxs("small", { className: "text-[12px] font-medium ", children: [
        rating.countRating,
        " ",
        " ",
        !rating.countRating || rating.countRating < 2 ? "client a donné son avis" : "clients ont donné leur avis"
      ] }) })
    ] })
  ] }) });
};
const __vite_glob_0_69 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Note$1
}, Symbol.toStringTag, { value: "Module" }));
const RatingCard$1 = (props) => {
  const { restaurant, avis } = props;
  const tabs = [
    { name: "Note globale", value: "note_globale" },
    { name: "Avis", value: "avis" }
  ];
  return /* @__PURE__ */ jsx(
    Card,
    {
      "x-chunk": "card-ratings",
      className: "bg-background h-fit w-full shadow",
      children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "note_globale", className: "w-full", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsx(TabsList, { className: "w-full bg-background h-6", children: tabs.map((tab, index) => /* @__PURE__ */ jsx(
          TabsTrigger,
          {
            className: "w-full rounded-none border-b border-muted-foreground/40\n                                    text-muted-foreground/40 data-[state=active]:text-primary \n                             data-[state=active]:border-primary\n                            ",
            value: tab.value,
            children: tab.name
          },
          index
        )) }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "px-4", children: [
          /* @__PURE__ */ jsx(TabsContent, { value: "note_globale", children: /* @__PURE__ */ jsx(Note$1, { restaurant }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "avis", children: /* @__PURE__ */ jsx(Avis$1, { restaurant, avis }) })
        ] })
      ] })
    }
  );
};
const __vite_glob_0_70 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RatingCard$1
}, Symbol.toStringTag, { value: "Module" }));
const HoursCard = (props) => {
  const { hours } = props;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "card-hours",
      className: "bg-background h-fit w-full shadow",
      children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-7", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Horaires d'ouverture" }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("ul", { className: "space-y-0.5 text-[14px]", children: Object.values(hours).map((day, index) => /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  day.isToday ? "font-semibold" : "font-normal"
                ),
                children: day.day_name
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center", children: day.services.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: day.services.map(
              (service, index2) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: cn(
                    day.isToday ? "font-semibold" : "font-normal",
                    "text-[12px]"
                  ),
                  children: [
                    formatTime(
                      service.start_time
                    ),
                    " - ",
                    formatTime(
                      service.end_time
                    )
                  ]
                },
                index2
              )
            ) }) : /* @__PURE__ */ jsx("small", { className: "text-muted-foreground", children: "Fermé" }) })
          ] }),
          index < Object.values(hours).length - 1 && /* @__PURE__ */ jsx(Separator, { className: "text-normal inline-block h-px my-1.5" })
        ] }, day.day_id)) }) })
      ]
    }
  );
};
const __vite_glob_0_64 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HoursCard
}, Symbol.toStringTag, { value: "Module" }));
const isImage = (attachment) => {
  let mime = attachment.mime || attachment.type;
  if (mime) {
    mime = mime.split("/")[0];
    return mime.toLowerCase() === "image";
  }
  return false;
};
async function readFile(file) {
  return new Promise((resolve, reject) => {
    if (isImage(file)) {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });
}
const PageContent = (props) => {
  const {
    restaurant,
    hours,
    can = {
      enablePage: false,
      updatePage: false,
      updateBanner: false,
      updateAvatar: false,
      updateMedia: false
    },
    avis
  } = props;
  const buttonRef = useRef(null);
  const [canBook, setCanBook] = useState(restaurant.accept_reservations);
  const [lateralButton, setLateralButton] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setLateralButton(true);
        } else {
          setLateralButton(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1
      }
    );
    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }
    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const variants2 = {
    close: {
      opacity: 0,
      x: 100,
      rotate: isMediumScreen ? -90 : 0
    },
    open: {
      opacity: 1,
      x: 0,
      rotate: isMediumScreen ? -90 : 0
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("main", { className: "max-w-5xl mx-auto h-[200vh]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "h-full w-full relative", children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full h-72 overflow-hidden", children: /* @__PURE__ */ jsx(Banner, { can, restaurant }) }),
        /* @__PURE__ */ jsx(Avatar, { can, restaurant })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              backgroundImage: "radial-gradient(200% 140% at 60% 0%, #020617 50%, hsl(var(--primary-blue)))"
            },
            className: "py-10 bg-gray-800 w-full",
            children: [
              /* @__PURE__ */ jsx(
                "h1",
                {
                  className: "text-3xl text-primary-foreground font-bold text-center tracking-wider mb-4",
                  title: `Restaurant: ${restaurant.name}`,
                  children: restaurant.name
                }
              ),
              canBook && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-full text-center",
                  ref: buttonRef,
                  children: /* @__PURE__ */ jsx(
                    BookingButton,
                    {
                      title: `Réserver une table`,
                      restaurant
                    }
                  )
                }
              ),
              !canBook && /* @__PURE__ */ jsx("p", { className: "text-center tracking-wide text-background text-[14px]", children: "Les réservations en ligne ne sont pas disponibles actuellement." })
            ]
          }
        ),
        /* @__PURE__ */ jsx(Media, { can, restaurant })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-3 gap-2 w-full mt-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-2", children: [
          /* @__PURE__ */ jsx(MenuCard, { restaurant }),
          /* @__PURE__ */ jsx(ContactCard, { restaurant }),
          /* @__PURE__ */ jsx(NewsletterCard, { restaurant }),
          /* @__PURE__ */ jsx(DescriptionCard, { restaurant })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full md:col-start-3 space-y-3", children: [
          /* @__PURE__ */ jsx(RatingCard$1, { restaurant, avis }),
          /* @__PURE__ */ jsx(HoursCard, { hours })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: canBook == true && lateralButton && /* @__PURE__ */ jsx(
      m.div,
      {
        variants: variants2,
        initial: "close",
        animate: "open",
        exit: "close",
        transition: {
          duration: 0.4,
          ease: "easeInOut"
        },
        className: "cursor-pointer hover:bg-primary/90 transition-colors fixed bottom-0 right-0 md:bottom-[40%] w-1/2 md:w-fit md:transform md:-rotate-90 md:origin-bottom-right bg-primary text-primary-foreground md:px-10 py-4 rounded-t-md",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => {
              router.visit("/book/" + restaurant.id);
            },
            className: "flex items-center justify-center gap-2 tracking-tight",
            children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "w-5 h-5" }),
              " Réserver une table"
            ]
          }
        )
      }
    ) })
  ] });
};
const Avatar = ({ can, restaurant }) => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [validateButton, setValidateButton] = useState(false);
  const databaseAvatar = restaurant.avatar ? restaurant.avatar : null;
  async function handleAvatarChange(event) {
    if (event.target.files) {
      data2.avatar = event.target.files[0];
      const myFile = event.target.files[0];
      setAvatarSrc(await readFile(myFile));
      setValidateButton(true);
    }
    event.target.value = "";
  }
  const {
    data: data2,
    processing,
    errors,
    post,
    delete: deleteForm
  } = useForm({
    avatar: null
  });
  const resetAvatar = () => {
    data2.avatar = null;
    setAvatarSrc(null);
    setValidateButton(false);
  };
  const deleteAvatar = () => {
    if (!(can == null ? void 0 : can.updateAvatar)) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action"
      );
      return;
    }
    deleteForm(
      route("dashboard.avatar.delete", { restaurant: restaurant.id }),
      {
        preserveScroll: true,
        onSuccess: (res) => {
          resetAvatar();
          setValidateButton(false);
          toast.success("Avatar supprimé.");
        },
        onError: () => {
          toast.error("Une erreur est survenue");
        }
      }
    );
  };
  const updateAvatarPut = () => {
    if (!(can == null ? void 0 : can.updateAvatar)) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action"
      );
      return;
    }
    post(
      route("dashboard.avatar.update", {
        restaurant: restaurant.id,
        data: data2
      }),
      {
        preserveScroll: true,
        onSuccess: (res) => {
          resetAvatar();
          setValidateButton(false);
          toast.success("Avatar mis à jour avec succès");
        },
        onError: () => {
          toast.error("Une erreur est survenue");
        }
      }
    );
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "w-[120px] h-[120px]\n                            absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30px]\n                            ",
      children: /* @__PURE__ */ jsxs("div", { className: "group relative w-full h-full rounded-full", children: [
        /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: avatarSrc || databaseAvatar || "https://placehold.co/600/orange/white?text=Logo",
              className: "aspect-auto w-full h-full rounded-full"
            }
          ),
          avatarSrc && /* @__PURE__ */ jsx(
            "div",
            {
              onClick: resetAvatar,
              className: "absolute left-2 top-2 cursor-pointer bg-destructive rounded-full p-1",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4 relative text-primary-foreground" })
            }
          ),
          (can == null ? void 0 : can.updateAvatar) && restaurant.avatar && !validateButton && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center opacity-0 group-hover:opacity-60 group-hover:transition-all absolute inset-0 bg-primary rounded-full", children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              disabled: processing,
              variant: "ghost",
              className: "px-1 py-0.5",
              onClick: deleteAvatar,
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-destructive" })
            }
          ) })
        ] }),
        can && can.updateAvatar && can.updatePage && /* @__PURE__ */ jsx("div", { className: "absolute right-2 top-2 ", children: validateButton ? /* @__PURE__ */ jsx(
          Button,
          {
            className: "py-0 px-0 h-fit p-1 rounded-full text-primary-foreground",
            variant: "primaryBlue",
            type: "button",
            disabled: processing,
            onClick: updateAvatarPut,
            children: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" })
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "cursor-pointer bg-green-500 rounded-full p-1", children: [
          /* @__PURE__ */ jsx(Camera, { className: "w-4 h-4 relative text-primary-foreground" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              onChange: handleAvatarChange,
              type: "file",
              className: "absolute inset-0 opacity-0 cursor-pointer"
            }
          )
        ] }) })
      ] })
    }
  );
};
const Banner = ({ can, restaurant }) => {
  const {
    data: data2,
    post,
    delete: deleteForm,
    processing
  } = useForm({
    banner: null
  });
  const [bannerSrc, setBannerSrc] = useState(null);
  const [displayFormButton, setDisplayFormButton] = useState(false);
  const handleBanner = async (event) => {
    if (event.target.files) {
      const myFile = event.target.files[0];
      data2.banner = event.target.files[0];
      setBannerSrc(await readFile(myFile));
      setDisplayFormButton(true);
    }
    event.target.value = "";
  };
  const resetBanner = () => {
    data2.banner = null;
    setBannerSrc(null);
    setDisplayFormButton(false);
  };
  const deleteBanner = () => {
    if (!(can == null ? void 0 : can.updateAvatar)) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action"
      );
      return;
    }
    deleteForm(
      route("dashboard.banner.delete", { restaurant: restaurant.id }),
      {
        preserveScroll: true,
        onSuccess: (res) => {
          resetBanner();
          setDisplayFormButton(false);
          toast.success("Bannière supprimée.");
        },
        onError: () => {
          toast.error("Une erreur est survenue");
          resetBanner();
        }
      }
    );
  };
  const updateBanner = () => {
    if (!(can == null ? void 0 : can.updateBanner)) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action"
      );
      return;
    }
    post(
      route("dashboard.banner.update", {
        restaurant: restaurant.id,
        data: data2
      }),
      {
        preserveScroll: true,
        onSuccess: (res) => {
          setDisplayFormButton(false);
          toast.success("Bannière mise à jour avec succès");
        },
        onError: () => {
          toast.error("Une erreur est survenue");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "group w-full h-full relative", children: [
    (can == null ? void 0 : can.updateBanner) && restaurant.banner && !displayFormButton && /* @__PURE__ */ jsx(
      "div",
      {
        className: "\n                flex justify-center items-center\n                opacity-0 group-hover:opacity-70 transition-opacity absolute inset-0 bg-primary",
        children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: deleteBanner,
            className: "",
            disabled: processing,
            variant: "destructive",
            children: /* @__PURE__ */ jsx(X, { className: "w-7 h-7" })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: bannerSrc || restaurant.banner || "https://placehold.co/600/orange/white?text=Logo",
        className: "h-auto w-full aspect-auto object-contain"
      }
    ),
    can && can.updateBanner && can.updatePage && /* @__PURE__ */ jsx("div", { className: "absolute right-1 top-1", children: displayFormButton ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          disabled: processing,
          variant: "destructive",
          onClick: resetBanner,
          children: "Annuler"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          disabled: processing,
          onClick: updateBanner,
          type: "button",
          className: "text-white",
          variant: "primaryBlue",
          children: "Valider"
        }
      )
    ] }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Button, { className: "relative", variant: "outline", children: [
      /* @__PURE__ */ jsx("span", { children: "Changer la bannière" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          onChange: handleBanner,
          type: "file",
          className: "absolute inset-0 opacity-0"
        }
      )
    ] }) }) })
  ] });
};
const Media = ({ can, restaurant }) => {
  const [files, setFiles] = useState([]);
  const [displayButton, setDisplayButton] = useState(false);
  const {
    data: data2,
    post,
    delete: deleteMediaForm,
    processing,
    errors
  } = useForm({
    attachments: []
  });
  const handleMedia = async (event) => {
    setDisplayButton(true);
    if (event.target.files) {
      const myFile = event.target.files[0];
      const fileAsString = await readFile(myFile);
      setFiles((prevFiles) => [
        ...prevFiles,
        { id: null, src: fileAsString, file: myFile }
      ]);
    }
    event.target.value = "";
  };
  const cancelMedia = (index) => {
    setFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };
  const deleteMediaFromDB = ({ id }) => {
    if (!(can == null ? void 0 : can.updateMedia)) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action"
      );
      return;
    }
    deleteMediaForm(
      route("dashboard.media.delete", {
        restaurant: restaurant.id,
        id
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Media supprimé.");
        },
        onError: () => {
          toast.error("Une erreur est survenue");
        }
      }
    );
  };
  const resetMedia = () => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== null));
    setDisplayButton(false);
  };
  const saveMedia = () => {
    data2.attachments = files.map((file) => file.file);
    if (!(can == null ? void 0 : can.updateMedia)) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action"
      );
      return;
    }
    post(
      route("dashboard.media.update", {
        restaurant: restaurant.id,
        data: data2
      }),
      {
        preserveScroll: true,
        onSuccess: () => {
          setDisplayButton(false);
          setFiles([]);
          toast.success("Bannière mise à jour avec succès");
        },
        onError: () => {
          toast.error("Une erreur est survenue");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: cn(displayButton && "border p-2 space-y-2"), children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5", children: [
      /* @__PURE__ */ jsx(Fragment, { children: restaurant.medias && restaurant.medias.map((media, index) => {
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "h-auto w-full relative",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: media.path,
                  alt: restaurant.name,
                  className: "aspect-auto w-full h-full object-contain"
                }
              ),
              (can == null ? void 0 : can.updatePage) && (can == null ? void 0 : can.updateMedia) && /* @__PURE__ */ jsx(
                X,
                {
                  onClick: () => {
                    deleteMediaFromDB({
                      id: media.id
                    });
                  },
                  className: "text-white hover:bg-muted-foreground/90 bg-muted-foreground cursor-pointer w-4 h-4 absolute top-0 right-0"
                }
              )
            ]
          },
          index
        );
      }) }),
      files && files.map((file, index) => {
        const attachmentErrorKey = `attachments.${index}`;
        return /* @__PURE__ */ jsxs("div", { className: "h-auto w-full relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: file.src,
              alt: restaurant.name,
              className: "aspect-auto w-full h-full object-contain"
            }
          ),
          (can == null ? void 0 : can.updatePage) && (can == null ? void 0 : can.updateMedia) && /* @__PURE__ */ jsx(
            X,
            {
              onClick: () => {
                cancelMedia(index);
              },
              className: "text-white hover:bg-muted-foreground/90 bg-muted-foreground cursor-pointer w-4 h-4 absolute top-0 right-0"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors[attachmentErrorKey],
              className: "mt-2 font-semibold"
            }
          )
        ] }, index);
      }),
      (can == null ? void 0 : can.updateMedia) && /* @__PURE__ */ jsx(Fragment, { children: (!files && !restaurant.medias || (files ? files.length : 0) + (restaurant.medias ? restaurant.medias.length : 0) < 5) && /* @__PURE__ */ jsx(UploadFileInput, { handleMedia }) })
    ] }),
    displayButton && /* @__PURE__ */ jsxs("div", { className: "bg-secondary w-full flex items-center gap-3 justify-center py-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: resetMedia,
          disabled: processing,
          type: "button",
          children: "Annuler"
        }
      ),
      /* @__PURE__ */ jsx(
        SubmitButton,
        {
          disabled: processing,
          onClick: saveMedia,
          type: "button",
          variant: "outline",
          children: "Enregistrer"
        }
      )
    ] })
  ] });
};
const UploadFileInput = ({
  handleMedia
}) => {
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center border border-dashed border-gray-900/25 min-h-36 h-full w-full items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center w-full", children: [
    /* @__PURE__ */ jsx(
      CameraIcon,
      {
        className: "mx-auto h-8 w-8 text-gray-300",
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mt-2 flex text-sm leading-6 text-gray-600 text-center", children: /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: "file-upload",
        className: "flex items-center justify-center w-full relative cursor-pointer rounded-md  font-semibold",
        children: [
          /* @__PURE__ */ jsx(Upload, { className: "w-7 h-7 text-primaryBlue mb-2" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              onChange: handleMedia,
              id: "file-upload",
              name: "file-upload",
              type: "file",
              className: "sr-only"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "text-xs flex-wrap text-center leading-5 text-muted-foreground", children: "PNG, JPG, WEBP jusqu'à 1Go" })
  ] }) }) });
};
const __vite_glob_0_67 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: PageContent
}, Symbol.toStringTag, { value: "Module" }));
const EnablePage = (props) => {
  const { restaurant, can } = props;
  const [loading, setLoading] = useState(false);
  const [enablePage, setEnablePage] = useState(
    restaurant.enable_page
  );
  const [errors, setErrors] = useState({
    enable_page: ""
  });
  const submit = (e) => {
    if (!can.enablePage) {
      toast.error("Vous n'avez pas la permission d'activer cette page");
      return;
    }
    setLoading(true);
    setErrors({
      enable_page: ""
    });
    axios.put(`/dashboard/${restaurant.id}/page/enablePage`, {
      enable_page: e
    }).then((response) => {
      toast.success("Page activée !");
      router.reload();
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  const copy = () => {
    navigator.clipboard.writeText((restaurant == null ? void 0 : restaurant.restaurant_link_page) ?? "");
    toast.success("Lien copié !");
  };
  return /* @__PURE__ */ jsxs(Card, { "x-chunk": "settings-page", className: "md:col-span-1 bg-accent h-fit", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "px-7 py-3", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-md", children: "Page web" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Rendre public ou non votre page vitrine." })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "gap-2", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          label: "Activer le page web ?",
          fieldName: "enable_page",
          className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4\n    bg-background space-y-0\n    ",
          error: errors.enable_page,
          children: /* @__PURE__ */ jsx(
            Switch,
            {
              checked: enablePage,
              disabled: loading,
              onCheckedChange: (e) => {
                setEnablePage(() => {
                  submit(e);
                  return e;
                });
              }
            }
          )
        }
      ),
      restaurant.enable_page == true && can.enablePage ? /* @__PURE__ */ jsxs("div", { className: "text-sm mt-5 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "link",
            onClick: () => {
              window.open(
                restaurant.restaurant_link_page,
                "_blank"
              );
            },
            children: /* @__PURE__ */ jsxs("span", { className: "flex gap-2 items-center", children: [
              " ",
              "Voir la page en ligne",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 text-inherit" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "flex gap-2 items-center",
            variant: "outline",
            onClick: copy,
            children: [
              "Copier le lien",
              /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4 text-inherit" })
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsx("p", { className: "p-4", children: "La page est actuellement désactivée." })
    ] })
  ] });
};
const __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: EnablePage
}, Symbol.toStringTag, { value: "Module" }));
const Page = (props) => {
  const { hours, restaurant, can, avis } = props;
  return /* @__PURE__ */ jsxs(LazyMotion, { features: domAnimation, children: [
    /* @__PURE__ */ jsx("div", { className: "md:grid md:grid-cols-3", children: /* @__PURE__ */ jsxs("div", { className: "md:col-span-1 md:col-start-3", children: [
      " ",
      /* @__PURE__ */ jsx(EnablePage, { restaurant: restaurant.data, can })
    ] }) }),
    /* @__PURE__ */ jsx(PageContent, { restaurant: restaurant.data, hours, can, avis })
  ] });
};
Page.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
const Avis = (props) => {
  const { rating } = props;
  return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-medium", children: [
      formatRating(rating.average),
      " ",
      /* @__PURE__ */ jsx(Star$1, { className: "w-4 h-4 fill-primary" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-[14px]", children: rating.comment }),
      /* @__PURE__ */ jsx("small", { className: "text-muted-foreground", children: format(new Date(rating.created_at), "dd/MM/yyyy") })
    ] })
  ] }) });
};
const __vite_glob_0_27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Avis
}, Symbol.toStringTag, { value: "Module" }));
const Note = (props) => {
  const { rating } = props;
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-6 border rounded-md overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          backgroundImage: "radial-gradient(200% 140% at 60% 0%, #020617 50%, hsl(var(--primary-blue)))"
        },
        className: "bg-primary col-span-2 w-full text-primary-foreground\n        flex items-center justify-center\n        ",
        children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-medium tracking-wide", children: rating.average ? formatRating(rating.average) : "0" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "col-span-4 bg-secondary text-sm tracking-tight leading-6 text-muted-foreground h-fit", children: /* @__PURE__ */ jsx("ul", { className: "p-3", children: rating.notes && rating.notes.map((item, index) => {
      return /* @__PURE__ */ jsxs(
        "li",
        {
          className: "flex items-end gap-3",
          children: [
            /* @__PURE__ */ jsx("span", { className: "tracking-tighter", children: item.item.name }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block align-text-bottom", children: formatRating(item.note) }),
              /* @__PURE__ */ jsx("span", { className: "mb-0.5", children: /* @__PURE__ */ jsx(Star$1, { className: "w-3 h-3 fill-primary" }) })
            ] })
          ]
        },
        index
      );
    }) }) })
  ] }) });
};
const __vite_glob_0_28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Note
}, Symbol.toStringTag, { value: "Module" }));
const RatingCard = (props) => {
  const { rating } = props;
  const tabs = [
    { name: "Note globale", value: "note_globale" },
    { name: "Avis", value: "avis" }
  ];
  return /* @__PURE__ */ jsx(
    Card,
    {
      "x-chunk": "card-ratings",
      className: "bg-background h-fit w-full shadow",
      children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "note_globale", className: "w-full", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsx(TabsList, { className: "w-full bg-background h-6", children: tabs.map((tab, index) => /* @__PURE__ */ jsx(
          TabsTrigger,
          {
            className: "w-full rounded-none border-b border-muted-foreground/40\n                                    text-muted-foreground/40 data-[state=active]:text-primary \n                             data-[state=active]:border-primary\n                            ",
            value: tab.value,
            children: tab.name
          },
          index
        )) }) }),
        /* @__PURE__ */ jsxs(CardContent, { className: "px-4", children: [
          /* @__PURE__ */ jsx(TabsContent, { value: "note_globale", children: /* @__PURE__ */ jsx(Note, { rating }) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "avis", children: /* @__PURE__ */ jsx(Avis, { rating }) })
        ] })
      ] })
    }
  );
};
const __vite_glob_0_29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RatingCard
}, Symbol.toStringTag, { value: "Module" }));
const Pagination = ({ meta }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 py-4", children: [
    meta.links.map((link, index) => {
      const labelNumber = Number(link.label);
      if (isNaN(labelNumber)) {
        return link.label === "&laquo; Previous" && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              router.visit(link.url);
            },
            disabled: !link.url,
            children: "Précédent"
          },
          index
        );
      }
    }),
    /* @__PURE__ */ jsxs("small", { children: [
      meta.current_page,
      " / ",
      meta.last_page
    ] }),
    meta.links.map((link, index) => {
      const labelNumber = Number(link.label);
      if (isNaN(labelNumber)) {
        return link.label !== "&laquo; Previous" && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              router.visit(link.url);
            },
            disabled: !link.url,
            children: "Suivant"
          },
          index
        );
      }
    })
  ] });
};
const AcceptRating = (props) => {
  const {
    restaurant,
    can = {
      enable_rating: false
    }
  } = props;
  const [loading, setLoading] = useState(false);
  const [acceptRating, setAcceptRating] = useState(
    restaurant.accept_rating
  );
  const [errors, setErrors] = useState({
    accept_rating: ""
  });
  const submit = (e) => {
    if (!can.enable_rating) {
      toast.error("Vous n'avez pas les droits pour effectuer cette action");
      return;
    }
    setLoading(true);
    setErrors({
      accept_rating: ""
    });
    axios.put(`/dashboard/${restaurant.id}/ratings/status`, {
      accept_rating: e
    }).then((response) => {
      toast.success("Statut modifié !");
      router.reload();
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      "x-chunk": "dashboard-05-chunk-3",
      className: "md:col-span-1 bg-accent h-fit",
      children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Statut du formulaire d'évaluation" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Activer ou désactiver l'envoi d'un formulaire d'évaluation à vos clients, suite à leur passage dans votre établissement." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "gap-2", children: /* @__PURE__ */ jsx(
          FormFieldLayout,
          {
            label: "Activer les évaluations ?",
            fieldName: "name",
            className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4\n                    bg-background space-y-0\n                    ",
            error: (errors == null ? void 0 : errors.accept_rating) ?? "",
            children: /* @__PURE__ */ jsx(
              Switch,
              {
                checked: acceptRating,
                disabled: loading || !can.enable_rating,
                onCheckedChange: (e) => {
                  setAcceptRating(() => {
                    submit(e);
                    return e;
                  });
                }
              }
            )
          }
        ) })
      ]
    }
  );
};
const __vite_glob_0_26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AcceptRating
}, Symbol.toStringTag, { value: "Module" }));
const Ratings = (props) => {
  const {
    ratings,
    restaurant,
    can = {
      enable_rating: false
    }
  } = props;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10", children: /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold tracking-wide p-2", children: "Vos évaluations clients" }) }),
    /* @__PURE__ */ jsx(AcceptRating, { restaurant: restaurant.data, can }),
    /* @__PURE__ */ jsx("div", { className: "md:grid grid-cols-3 gap-2", children: ratings && ratings.data.map((rating) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("small", { children: [
        " ",
        format(
          new Date(rating.created_at),
          "dd/MM/yyyy"
        ),
        " ",
        "- ",
        rating.email
      ] }),
      /* @__PURE__ */ jsx(RatingCard, { rating })
    ] }, rating.id)) }),
    !ratings.data.length && /* @__PURE__ */ jsx("p", { children: "Pas d'évaluation client à afficher actuellement." }),
    /* @__PURE__ */ jsx(Pagination, { meta: ratings.meta })
  ] });
};
Ratings.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ratings
}, Symbol.toStringTag, { value: "Module" }));
function classNames$1(...classes) {
  return classes.filter(Boolean).join(" ");
}
const CalendarReservation = ({ today, selectedDay, setSelectedDay, containerClassNames, todaySelectedClassNames = "bg-primaryBlue text-white" }) => {
  let [currentMonth, setCurrentMonth] = useState(
    format(today, "MMMM-yyyy", { locale: fr })
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", /* @__PURE__ */ new Date(), {
    locale: fr
  });
  let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1, locale: fr }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1, locale: fr })
  });
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy", { locale: fr }));
  }
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy", { locale: fr }));
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("md:pr-14", containerClassNames), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "flex-auto text-sm font-semibold text-muted-foreground capitalize", children: format(firstDayCurrentMonth, "MMMM yyyy", { locale: fr }) }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: previousMonth,
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "-my-1.5 flex flex-none items-center justify-center py-0.5 px-1.5 ",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous month" }),
            /* @__PURE__ */ jsx(ChevronLeftIcon, { className: "h-5 w-5 text-muted-foreground", "aria-hidden": "true" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: nextMonth,
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "-my-1.5 flex flex-none items-center justify-center py-0.5 px-1.5",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next month" }),
            /* @__PURE__ */ jsx(ChevronRightIcon$1, { className: "text-muted-foreground h-5 w-5", "aria-hidden": "true" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-secondary py-1 rounded-md mt-10 grid grid-cols-7 text-center text-xs leading-6 text-secondary-foreground", children: [
      /* @__PURE__ */ jsx("div", { children: "L" }),
      /* @__PURE__ */ jsx("div", { children: "Ma" }),
      /* @__PURE__ */ jsx("div", { children: "Mer" }),
      /* @__PURE__ */ jsx("div", { children: "J" }),
      /* @__PURE__ */ jsx("div", { children: "V" }),
      /* @__PURE__ */ jsx("div", { children: "S" }),
      /* @__PURE__ */ jsx("div", { children: "D" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 text-sm", children: newDays.map((day, dayIdx) => /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames$1(
          dayIdx > 6 && "",
          dayIdx === 0 && colStartClasses$1[getDay(day)],
          "py-2"
        ),
        children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedDay(day),
            className: classNames$1(
              isEqual(day, selectedDay) && "text-secondary-foreground/80",
              !isEqual(day, selectedDay) && isToday(day) && "text-primaryBlue/80",
              !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && "text-foreground",
              !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && "text-muted-foreground/60",
              isEqual(day, selectedDay) && isToday(day) && todaySelectedClassNames,
              isEqual(day, selectedDay) && !isToday(day) && "bg-secondary",
              !isEqual(day, selectedDay) && "hover:bg-secondary",
              (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
              "mx-auto flex h-12 w-12 items-center justify-center rounded-full relative"
            ),
            children: /* @__PURE__ */ jsx(
              "time",
              {
                dateTime: format(day, "dd-MM-yyyy"),
                children: format(day, "d", { locale: fr })
              }
            )
          }
        )
      },
      day.toString()
    )) })
  ] });
};
let colStartClasses$1 = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6"
];
const __vite_glob_0_31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CalendarReservation
}, Symbol.toStringTag, { value: "Module" }));
const createSelectors$7 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useShowReservationModal = createSelectors$7(create(
  (set) => ({
    isOpen: false,
    onOpen: () => {
      set({ loading: true });
      set({ isOpen: true });
    },
    onClose: () => {
      set({ isOpen: false });
    },
    restaurantId: null,
    setRestaurantId: (id) => set({ restaurantId: id }),
    status: [],
    setStatus: (status) => set({ status }),
    setReservationId: (id) => {
      set({ reservationId: id });
      set(({ restaurantId }) => {
        if (id !== null) {
          axios.get(`/${restaurantId}/reservation/${id}`).then((response) => {
            set({ reservation: response.data.data.reservation });
            set({ status: response.data.data.reservationStatus });
          }).catch((error) => {
          }).then(() => {
            set({ loading: false });
          });
        }
        return { reservationId: id };
      });
    },
    reservationId: null,
    loading: false,
    setLoading: (loading) => set({ loading }),
    reservation: null,
    setReservation: (reservation) => set({ reservation })
  })
));
const SeeReservation = ({ restaurant }) => {
  const reservation = useShowReservationModal.use.reservation();
  const status = useShowReservationModal.use.status();
  const modalIsOpen = useShowReservationModal.use.isOpen();
  const modalOnClose = useShowReservationModal.use.onClose();
  const loading = useShowReservationModal.use.loading();
  const [openReason, setOpenReason] = useState(false);
  useEffect(() => {
    if (modalIsOpen && reservation) {
      setData("reservation_id", reservation.id);
    }
  }, [reservation]);
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    reservation_id: (reservation == null ? void 0 : reservation.id) ?? null,
    status: (reservation == null ? void 0 : reservation.status) ?? null,
    reason: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("reservation.change.status", { reservation: reservation == null ? void 0 : reservation.id, restaurant: restaurant.id }), {
      preserveScroll: true,
      onError: (e2) => {
        toast.error("Une erreur s'est produite, veuillez réessayer.");
      },
      onSuccess: (e2) => {
        modalOnClose();
        setOpenReason(false);
        toast.success("Le status de la réservation a été modifié avec succès.");
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: "Réservation",
      description: "Détails de la réservation",
      isOpen: modalIsOpen,
      onClose: () => {
        modalOnClose();
        setOpenReason(false);
      },
      children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-4 py-2 pb-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: loading ? /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "w-6 h-6 animate animate-spin" }) }) : /* @__PURE__ */ jsxs("div", { className: "text-sm leading-6", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Nom : ",
          reservation == null ? void 0 : reservation.last_name,
          " ",
          /* @__PURE__ */ jsx("br", {}),
          " ",
          "Prénom : ",
          reservation == null ? void 0 : reservation.first_name
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Email : ",
          reservation == null ? void 0 : reservation.email
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Téléphone :",
          " ",
          (reservation == null ? void 0 : reservation.phone) ?? "Non renseigné"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Date de réservation :",
          " ",
          reservation == null ? void 0 : reservation.reservation_date,
          " -",
          " ",
          (reservation == null ? void 0 : reservation.time) ? formatTime(reservation == null ? void 0 : reservation.time) : null
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Nombre de couverts :",
          " ",
          reservation == null ? void 0 : reservation.guests
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Table : ",
          reservation == null ? void 0 : reservation.table.name
        ] }),
        /* @__PURE__ */ jsx(Separator, { className: "my-2" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Status de la réservation",
              fieldName: "status",
              error: errors.status ?? "",
              className: "w-full",
              children: /* @__PURE__ */ jsxs(
                Select,
                {
                  onValueChange: (e) => {
                    setOpenReason(true);
                    setData("status", e);
                  },
                  defaultValue: reservation == null ? void 0 : reservation.status,
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "status" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { id: "status", children: status.map((item) => /* @__PURE__ */ jsx(
                      SelectItem,
                      {
                        value: item,
                        children: item
                      },
                      item
                    )) })
                  ]
                }
              )
            }
          ),
          openReason && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Note au client",
                description: "Informez le client de la raison du changement de status.",
                fieldName: "status",
                error: errors.reason ?? "",
                className: "w-full",
                children: /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    placeholder: "Bonjour, nous vous informons que votre réservation a été annulée pour la raison suivante :",
                    className: "resize-none",
                    onChange: (e) => {
                      setData(
                        "reason",
                        e.target.value
                      );
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                disabled: processing,
                className: "w-full",
                children: "Modifier"
              }
            )
          ] }) })
        ] })
      ] }) }) }) }) })
    }
  );
};
const createSelectors$6 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useAddAdminReservationModal = createSelectors$6(create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, restaurantId: null, serviceId: null, date: null, time: null }),
  restaurantId: null,
  serviceId: null,
  date: null,
  time: null,
  setRestaurantId: (restaurantId) => set({ restaurantId }),
  setServiceId: (serviceId) => set({ serviceId }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time })
})));
function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1)
        return i;
      return i + 1;
    });
  }
  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0)
        return i;
      return i - 1;
    });
  }
  function goTo(index) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back
  };
}
function formatDateToIsoMidDay({ date }) {
  const d = date;
  let date2 = new Date(d);
  date2.setHours(12);
  return date2.toISOString();
}
const createSelectors$5 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useReservationAndResetAfterAdding = createSelectors$5(
  create((set) => ({
    reset: false,
    setReset: (reset) => set({ reset })
  }))
);
const AddAdminReservation = ({}) => {
  const [error, setError] = useState({});
  const [tables, setTables] = useState([]);
  const restaurantId = useAddAdminReservationModal.use.restaurantId();
  const reservationModalOnClose = useAddAdminReservationModal.use.onClose();
  const reservationModalIsOpen = useAddAdminReservationModal.use.isOpen();
  const selectedTime = useAddAdminReservationModal.use.time();
  const serviceId = useAddAdminReservationModal.use.serviceId();
  const setResetTheReservation = useReservationAndResetAfterAdding.use.setReset();
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    guests: void 0,
    time: "",
    table_id: void 0,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    service_id: void 0,
    services: [],
    reservation_date: ""
  });
  const date = useAddAdminReservationModal.use.date();
  const timeState = useDatePickerState({ granularity: "minute" });
  const {
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    steps,
    next,
    goTo
  } = useMultistepForm([
    /* @__PURE__ */ jsx(Guest, { data: data2, setData, error }),
    /* @__PURE__ */ jsx(
      TableAndTimeStep,
      {
        data: data2,
        setData,
        tables,
        error,
        timeState
      }
    ),
    /* @__PURE__ */ jsx(UserStep, { data: data2, setData, error })
  ]);
  useEffect(() => {
    if (!reservationModalIsOpen) {
      setError({});
      setTables([]);
      goTo(0);
      reset();
    }
  }, [reservationModalIsOpen]);
  useEffect(() => {
    if (serviceId) {
      setData({
        ...data2,
        "service_id": serviceId,
        "services": [serviceId]
      });
    }
  }, [serviceId]);
  const submit = (e) => {
    if (e)
      e.preventDefault();
    setError({});
    if (currentStepIndex + 1 === 1) {
      setData("reservation_date", formatDateToIsoMidDay({ date }));
      axios.post(`/${restaurantId}/reservation/create/stepOne`, {
        guests: data2.guests,
        reservation_date: formatDateToIsoMidDay({ date }),
        service_id: serviceId
      }).then((response) => {
        setTables(response.data.data.tables);
        return next();
      }).catch((e2) => {
        setError(e2.response.data.errors);
        return;
      });
    }
    if (currentStepIndex + 1 === 2) {
      axios.post(`/${restaurantId}/reservation/create/stepTwo`, {
        guests: data2.guests,
        time: data2.time,
        table_id: data2.table_id,
        reservation_date: formatDateToIsoMidDay({ date }),
        services: [serviceId]
      }).then((response) => {
        return next();
      }).catch((e2) => {
        setError(e2.response.data.errors);
        return;
      });
    }
    if (currentStepIndex + 1 === 3) {
      post(`/${restaurantId}/reservation/create/stepThree`, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Réservation effectuée avec succès");
          setResetTheReservation(true);
          reset();
          timeState.setTimeValue(void 0);
          reservationModalOnClose();
        },
        onError: (errors2) => {
          setError(errors2);
        }
      });
    }
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: `Réservation pour le ${format(
        date ?? /* @__PURE__ */ new Date(),
        "EEEE dd MMMM yyyy",
        {
          locale: fr
        }
      )}`,
      description: `Détails de la réservation pour votre service : ${selectedTime}`,
      isOpen: reservationModalIsOpen,
      onClose: () => {
        reservationModalOnClose();
      },
      children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-4 py-2 pb-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        step,
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5 gap-2", children: [
          !isFirstStep ? /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: back,
              className: "w-full col-span-2",
              children: "Retour"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "col-span-2 w-full" }),
          /* @__PURE__ */ jsxs("small", { className: "text-center self-center", children: [
            currentStepIndex + 1,
            " /",
            " ",
            steps.length
          ] }),
          /* @__PURE__ */ jsx(
            SubmitButton,
            {
              type: "submit",
              disabled: processing,
              className: "w-full col-span-2",
              children: isLastStep ? "Confirmer" : "Suivant"
            }
          )
        ] })
      ] }) }) }) }) }) })
    }
  );
};
const Guest = ({
  data: data2,
  setData,
  error
}) => {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    FormFieldLayout,
    {
      label: "Nombre d'invité",
      fieldName: "guests",
      error: error.guests,
      children: /* @__PURE__ */ jsx(
        Input,
        {
          id: "guests",
          type: "number",
          step: 1,
          min: 1,
          name: "guests",
          value: data2.guests ?? "",
          className: "mt-1 block w-full py-3 border",
          onChange: (e) => setData("guests", e.target.value)
        }
      )
    }
  ) });
};
const TableAndTimeStep = ({
  data: data2,
  setData,
  tables,
  error,
  timeState
}) => {
  var _a;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        fieldName: "time",
        error: error.time,
        label: "Choisir l'heure de réservation",
        children: /* @__PURE__ */ jsx(
          TimeField,
          {
            label: "Choisir l'heure de réservation",
            value: timeState.timeValue ?? "",
            onChange: (value) => {
              timeState.setTimeValue(value);
              const { hour, minute } = value;
              const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
              setData("time", time);
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Choix de la table",
        fieldName: "table_id",
        error: error.table_id,
        children: /* @__PURE__ */ jsxs(
          Select,
          {
            onValueChange: (e) => {
              setData("table_id", e);
            },
            defaultValue: void 0,
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(
                SelectValue,
                {
                  defaultValue: (_a = data2.table_id) == null ? void 0 : _a.toString(),
                  placeholder: "Choisir une table"
                }
              ) }),
              /* @__PURE__ */ jsx(SelectContent, { id: "table", children: tables.map((table) => {
                var _a2;
                return /* @__PURE__ */ jsxs(
                  SelectItem,
                  {
                    value: ((_a2 = table.id) == null ? void 0 : _a2.toString()) || "0",
                    children: [
                      table.name,
                      " - ",
                      table.seats,
                      " place(s)"
                    ]
                  },
                  table.id
                );
              }) })
            ]
          }
        )
      }
    )
  ] });
};
const UserStep = ({
  data: data2,
  setData,
  error
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "first_name",
          label: "Prénom",
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "first-name",
              value: data2.first_name ?? "",
              onChange: (e) => setData("first_name", e.target.value),
              placeholder: "Max"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "last_name",
          label: "Nom",
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "last-name",
              value: data2.last_name ?? "",
              onChange: (e) => setData("last_name", e.target.value),
              placeholder: "Robinson"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "email",
          label: "Email",
          children: /* @__PURE__ */ jsx(
            Input,
            {
              value: data2.email ?? "",
              onChange: (e) => setData("email", e.target.value),
              id: "email",
              type: "email",
              placeholder: "m@example.com"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "phone",
          label: "Téléphone",
          children: /* @__PURE__ */ jsx(
            Input,
            {
              value: data2.phone ?? "",
              onChange: (e) => setData("phone", e.target.value),
              id: "phone",
              type: "text",
              placeholder: "06 12 34 56 78"
            }
          )
        }
      )
    ] })
  ] });
};
const ListOfReservation = ({
  selectedDay,
  restaurant,
  servicesSelectedDay
}) => {
  const [reservations, setReservations] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const setRestaurantId = useShowReservationModal.use.setRestaurantId();
  const addAdminReservationModalOnOpen = useAddAdminReservationModal.use.onOpen();
  const addAdminReservationModalSetServiceId = useAddAdminReservationModal.use.setServiceId();
  const addAdminReservationModalSetRestaurantId = useAddAdminReservationModal.use.setRestaurantId();
  const addAdminReservationModalSetDate = useAddAdminReservationModal.use.setDate();
  const addAdminReservationModalSetTime = useAddAdminReservationModal.use.setTime();
  const getReservations = () => {
    setReservations([]);
    setLoading(true);
    axios.get(
      `/dashboard/${restaurant.id}/reservation/getReservationsByDate/${format(
        selectedDay,
        "dd-MM-yyyy",
        { locale: fr }
      )}`
    ).then((response) => {
      if (!response.data.data.reservations || response.data.data.reservations.length === 0)
        ;
      else {
        setReservations(response.data.data.reservations);
      }
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue lors de la récupération des réservations"
      );
    }).finally(() => {
      setLoading(false);
    });
  };
  const resetTheReservation = useReservationAndResetAfterAdding.use.reset();
  const setResetTheReservation = useReservationAndResetAfterAdding.use.setReset();
  useEffect(() => {
    if (resetTheReservation) {
      setResetTheReservation(false);
    }
    getReservations();
    setRestaurantId(restaurant.id);
  }, [selectedDay, resetTheReservation]);
  return /* @__PURE__ */ jsxs("section", { className: "mt-12 md:mt-0 md:pl-14", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold leading-6 text-foreground", children: /* @__PURE__ */ jsx("span", { children: "Réservation(s) " }) }),
      /* @__PURE__ */ jsx(
        "time",
        {
          dateTime: format(selectedDay, "EEEE dd MMMM yyyy", {
            locale: fr
          }),
          className: "capitalize text-sm",
          children: format(selectedDay, "EEEE dd MMMM yyyy", {
            locale: fr
          })
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsx(Loading, {}) : /* @__PURE__ */ jsx(Fragment, { children: servicesSelectedDay ? servicesSelectedDay.map((service, index) => {
      const endTimeParts = formatTime(service.end_time).split("h");
      const endTime = /* @__PURE__ */ new Date();
      endTime.setHours(parseInt(endTimeParts[0]));
      endTime.setMinutes(parseInt(endTimeParts[1]));
      const now = /* @__PURE__ */ new Date();
      const isPastDay = isBefore(endOfDay(selectedDay), now);
      const isToday2 = isSameDay(/* @__PURE__ */ new Date(), selectedDay);
      return /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex  items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-medium text-muted-foreground", children: service.name }),
            /* @__PURE__ */ jsxs("small", { className: "tracking-tighter", children: [
              formatTime(service.start_time),
              " -",
              " ",
              formatTime(service.end_time)
            ] })
          ] }),
          !isPastDay && (!isToday2 || isToday2 && now < endTime) && /* @__PURE__ */ jsx(
            Button,
            {
              size: "xs",
              type: "button",
              onClick: () => {
                addAdminReservationModalSetDate(selectedDay);
                addAdminReservationModalSetRestaurantId(restaurant.id);
                addAdminReservationModalSetServiceId(
                  service.id
                );
                addAdminReservationModalSetTime(`${formatTime(service.start_time)}/${formatTime(service.end_time)}`);
                addAdminReservationModalOnOpen();
              },
              children: /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" })
            }
          )
        ] }),
        reservations[service.id] && reservations[service.id].reservations.length > 0 ? /* @__PURE__ */ jsx(
          "ol",
          {
            className: "mt-4 space-y-1 text-sm leading-6",
            children: reservations[service.id].reservations.map((reservation) => /* @__PURE__ */ jsx(
              ReservationItem,
              {
                reservation
              },
              reservation.id
            ))
          },
          service.id
        ) : /* @__PURE__ */ jsx("p", { children: "Pas de réservations pour ce service." }),
        index !== servicesSelectedDay.length - 1 && /* @__PURE__ */ jsx(Separator, { className: "my-3" })
      ] }, service.id);
    }) : /* @__PURE__ */ jsx(Fragment, { children: "Fermé" }) }),
    /* @__PURE__ */ jsx(SeeReservation, { restaurant }),
    /* @__PURE__ */ jsx(AddAdminReservation, {})
  ] });
};
const Loading = () => {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-[60px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-[100px]" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" })
    ] })
  ] });
};
const ReservationItem = ({ reservation }) => {
  const setReservationId = useShowReservationModal.use.setReservationId();
  const reservationModalOnOpen = useShowReservationModal.use.onOpen();
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: "group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-muted hover:bg-muted",
      children: [
        /* @__PURE__ */ jsx("div", { className: "group-hover:bg-background h-10 w-10 bg-muted flex rounded-full items-center justify-center", children: /* @__PURE__ */ jsx(CalendarX, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-auto", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-semibold tracking-wide text-foreground", children: [
            reservation.last_name,
            " - Table: ",
            reservation.table.name
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-0.5 tracking-tight text-muted-foreground", children: [
            /* @__PURE__ */ jsx("time", { dateTime: reservation.time, children: formatTime(reservation.time) }),
            /* @__PURE__ */ jsxs("span", { children: [
              " Pour ",
              reservation.guests,
              " personne(s)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              setReservationId(reservation.id);
              reservationModalOnOpen();
            },
            size: "sm",
            className: "group-hover:bg-background",
            variant: "secondary",
            children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-muted-foreground" })
          }
        )
      ]
    },
    reservation.id
  );
};
const __vite_glob_0_32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ListOfReservation
}, Symbol.toStringTag, { value: "Module" }));
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const days = [
  {
    id: 1,
    name: "Lundi"
  },
  {
    id: 2,
    name: "Mardi"
  },
  {
    id: 3,
    name: "Mercredi"
  },
  {
    id: 4,
    name: "Jeudi"
  },
  {
    id: 5,
    name: "Vendredi"
  },
  {
    id: 6,
    name: "Samedi"
  },
  {
    id: 7,
    name: "Dimanche"
  }
];
const getSelectedDayIndex = (selectedDay) => {
  const day = days.find(
    (day2) => day2.name === capitalizeFirstLetter(
      format(selectedDay, "EEEE", { locale: fr })
    )
  );
  return (day == null ? void 0 : day.id) ?? 1;
};
const findServicesByDayId = (dayId, restaurant) => {
  const services = restaurant.services.filter((service) => service.day_id === dayId);
  return services.length > 0 ? services : null;
};
const Index$4 = ({ auth, restaurant }) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const selectedDayIndex = getSelectedDayIndex(selectedDay);
  const servicesSelectedDay = findServicesByDayId(
    selectedDayIndex,
    restaurant.data
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold tracking-wide p-2", children: "Réservations" }),
    /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-3 p-1 md:divide-x md:divide-background-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsx(
        CalendarReservation,
        {
          today,
          selectedDay,
          setSelectedDay
        }
      ) }),
      /* @__PURE__ */ jsx(
        ListOfReservation,
        {
          selectedDay,
          restaurant: restaurant.data,
          servicesSelectedDay
        }
      )
    ] })
  ] });
};
Index$4.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$4
}, Symbol.toStringTag, { value: "Module" }));
const Settings = (props) => {
  const { restaurant, can, isMissingInfo } = props;
  const user = useUser.use.user();
  const [showButtons, setShowButtons] = useState(false);
  const [isActive, setIsActive] = useState(restaurant.data.active);
  const [loading, setLoading] = useState(false);
  const { data: data2, setData, put, processing, errors, reset } = useForm({
    name: restaurant.data.name ?? "",
    phone: restaurant.data.phone ?? "",
    email: restaurant.data.email ?? "",
    address: restaurant.data.address ?? "",
    city: restaurant.data.city ?? "",
    zip: restaurant.data.zip ?? ""
  });
  const { showErrorToast } = useToastErrorNotFondator();
  const submit = (e) => {
    if (!can.update_settings) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action."
      );
      return;
    }
    e.preventDefault();
    put(
      route("dashboard.settings.update", {
        restaurant: restaurant.data.id
      }),
      {
        onSuccess: () => {
          toast.success("Les informations ont été mises à jour.");
          setShowButtons(false);
          router.reload();
        },
        onError: (error) => {
        }
      }
    );
  };
  const restaurantStatusSubmit = (e) => {
    if ((user == null ? void 0 : user.isFondator) == false) {
      toast.error(
        "Vous n'avez pas les droits pour effectuer cette action."
      );
      return;
    }
    setLoading(true);
    axios.put(
      route("dashboard.settings.change-status", {
        restaurant: restaurant.data.id
      }),
      {
        active: e
      }
    ).then((response) => {
      toast.success("Statut modifié !");
      router.reload();
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
    }).finally(() => {
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      FormFieldLayout,
      {
        label: "Status du restaurant",
        fieldName: "name",
        className: "flex w-fit items-center gap-6 space-y-0 rounded-lg border border-muted bg-background p-4",
        children: [
          isActive == true && "Actif",
          /* @__PURE__ */ jsx(
            Switch,
            {
              checked: isActive,
              disabled: loading || processing || !can.change_status,
              onCheckedChange: (e) => {
                if (!(user == null ? void 0 : user.isFondator)) {
                  showErrorToast({
                    message: "Votre niveau d'abonnement ne vous permet pas d'activer le système de messagerie.",
                    action: "Mettre à niveau"
                  });
                  return;
                }
                if (!can.change_status) {
                  toast.error(
                    "Vous n'avez pas les droits pour effectuer cette action."
                  );
                  return;
                }
                setIsActive(() => {
                  restaurantStatusSubmit(e);
                  return e;
                });
              }
            }
          ),
          !isActive && "Inactif",
          !(user == null ? void 0 : user.isFondator) && /* @__PURE__ */ jsx(ErrorMustBeFondator, { message: "Il faut être abonné pour pouvoir activer le système de contact." })
        ]
      }
    ),
    isMissingInfo && /* @__PURE__ */ jsx(AlertBanner, { children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-6", children: [
      /* @__PURE__ */ jsx("li", { children: "Des informations nécessaires au fonctionnement des services sont manquantes." }),
      /* @__PURE__ */ jsx("li", { children: "Veuillez remplir les champs marqués d'un *" })
    ] }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("h1", { className: "p-2 text-4xl font-semibold tracking-wide", children: [
          "Paramètre de votre restaurant: ",
          restaurant.data.name
        ] }),
        /* @__PURE__ */ jsx("div", { children: can.update_settings && showButtons && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              disabled: processing || loading,
              onClick: () => {
                reset();
                setShowButtons(false);
              },
              children: "Annuler"
            }
          ),
          /* @__PURE__ */ jsx(
            SubmitButton,
            {
              disabled: processing || loading,
              type: "submit",
              children: "Enregistrer"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs(
          Card,
          {
            "x-chunk": "dashboard-settings-adresse",
            className: "bg-accent md:col-span-1",
            children: [
              /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
                /* @__PURE__ */ jsx(CardTitle, { children: "Informations principales" }),
                /* @__PURE__ */ jsx(CardDescription, { children: "Ces informations sont obligatoires pour le bon fonction de nos services." })
              ] }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-3 md:gap-3", children: [
                /* @__PURE__ */ jsx(
                  FormFieldLayout,
                  {
                    label: "Nom du restaurant *",
                    fieldName: "name",
                    error: errors.name ?? "",
                    children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "name",
                        type: "name",
                        name: "name",
                        value: data2.name,
                        placeholder: "Nom du restaurant",
                        className: "mt-1 block w-full border py-3",
                        autoComplete: "username",
                        onChange: (e) => {
                          setData("name", e.target.value);
                          setShowButtons(true);
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormFieldLayout,
                  {
                    label: "Email du restaurant *",
                    fieldName: "email",
                    error: errors.email ?? "",
                    children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "email",
                        type: "email",
                        name: "email",
                        placeholder: "Adresse mail du restaurant",
                        value: data2.email,
                        className: "mt-1 block w-full border py-3",
                        onChange: (e) => {
                          setData("email", e.target.value);
                          setShowButtons(true);
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormFieldLayout,
                  {
                    label: "Téléphone *",
                    fieldName: "phone",
                    error: errors.phone ?? "",
                    children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "phone",
                        type: "phone",
                        name: "phone",
                        placeholder: "Téléphone du restaurant",
                        value: data2.phone,
                        className: "mt-1 block w-full border py-3",
                        onChange: (e) => {
                          setData("phone", e.target.value);
                          setShowButtons(true);
                        }
                      }
                    )
                  }
                )
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Card,
          {
            "x-chunk": "dashboard-settings-adresse",
            className: "bg-accent md:col-span-2",
            children: [
              /* @__PURE__ */ jsx(CardHeader, { className: "px-7", children: /* @__PURE__ */ jsx(CardTitle, { children: "Localisation" }) }),
              /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-3 md:gap-3", children: [
                /* @__PURE__ */ jsx(
                  FormFieldLayout,
                  {
                    label: "Adresse *",
                    fieldName: "address",
                    error: errors.address ?? "",
                    children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "address",
                        type: "address",
                        name: "address",
                        placeholder: "3 rue du Port",
                        value: data2.address,
                        className: "mt-1 block w-full border py-3",
                        autoComplete: "address",
                        onChange: (e) => {
                          setData("address", e.target.value);
                          setShowButtons(true);
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormFieldLayout,
                  {
                    label: "Code postal *",
                    fieldName: "zip",
                    error: errors.zip ?? "",
                    children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "zip",
                        type: "zip",
                        name: "zip",
                        placeholder: "72000",
                        value: data2.zip,
                        className: "mt-1 block w-full border py-3",
                        autoComplete: "zip",
                        onChange: (e) => {
                          setData("zip", e.target.value);
                          setShowButtons(true);
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormFieldLayout,
                  {
                    label: "Ville *",
                    fieldName: "city",
                    error: errors.city ?? "",
                    children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "city",
                        type: "city",
                        name: "city",
                        placeholder: "Le Mans",
                        value: data2.city,
                        className: "mt-1 block w-full border py-3",
                        autoComplete: "city",
                        onChange: (e) => {
                          setData("city", e.target.value);
                          setShowButtons(true);
                        }
                      }
                    )
                  }
                )
              ] }) })
            ]
          }
        )
      ] })
    ] })
  ] });
};
Settings.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Settings
}, Symbol.toStringTag, { value: "Module" }));
const SupportButton = () => {
  return /* @__PURE__ */ jsx("div", { children: "SupportButton" });
};
const isRestaurantMissInformation = (restaurant) => {
  const isMissingInformation = !restaurant.email || !restaurant.address || !restaurant.phone || !restaurant.city || !restaurant.zip ? true : false;
  return isMissingInformation;
};
const CanNotUseBooking = ({ restaurant }) => {
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx(AlertBanner, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-secondary-foreground", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "Le système de réservation est actuellement désactivé voici les raisons possibles :" }),
      /* @__PURE__ */ jsx("div", { className: "md:w-2/3", children: !restaurant.accept_reservations && /* @__PURE__ */ jsx(ReservationStatus, { restaurant }) }),
      /* @__PURE__ */ jsx("div", { className: "md:w-2/3", children: !restaurant.active && /* @__PURE__ */ jsx(RestaurantStatus, { restaurant }) }),
      isRestaurantMissInformation(restaurant) && /* @__PURE__ */ jsxs("div", { className: "pl-0.5 w-full flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(
          Error$1,
          {
            message: "Des informations nécessaires au\n                                            fonctionnement des services sont\n                                            manquantes. Veuillez les"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            className: "underline text-primaryBlue",
            href: route(
              "dashboard.settings.index",
              restaurant.id
            ),
            children: "compléter"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pl-0.5", children: /* @__PURE__ */ jsx(Error$1, { message: "Votre niveau d'abonnement ne le permet pas." }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-sm", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Si vous ne comprenez pas pourquoi vous avez ce message vous pouvez contacter le support client :",
        " "
      ] }),
      /* @__PURE__ */ jsx(SupportButton, {})
    ] })
  ] });
};
const __vite_glob_0_35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CanNotUseBooking
}, Symbol.toStringTag, { value: "Module" }));
const CanNotUseMessages = ({ restaurant }) => {
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(AlertBanner, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-secondary-foreground", children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "Le système de contact est actuellement désactivé voici les raisons possibles :" }),
    /* @__PURE__ */ jsx("div", { className: "md:w-2/3", children: !restaurant.accept_messages && /* @__PURE__ */ jsx(MessageStatus, { restaurant }) }),
    isRestaurantMissInformation(restaurant) && /* @__PURE__ */ jsxs("div", { className: "pl-0.5 w-full flex items-center gap-1", children: [
      /* @__PURE__ */ jsx(
        Error$1,
        {
          message: "Des informations nécessaires au\n                                            fonctionnement des services sont\n                                            manquantes. Veuillez les"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          className: "underline text-primaryBlue",
          href: route(
            "dashboard.settings.index",
            restaurant.id
          ),
          children: "compléter"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "pl-0.5", children: /* @__PURE__ */ jsx(Error$1, { message: "Votre niveau d'abonnement ne le permet pas." }) })
  ] }) }) });
};
const __vite_glob_0_36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CanNotUseMessages
}, Symbol.toStringTag, { value: "Module" }));
const AdminNotificationBooking = (props) => {
  const { restaurant, loading, setLoading, can } = props;
  const [enable, setEnable] = useState(
    restaurant.is_notify_restaurant_after_booking
  );
  const [errors, setErrors] = useState({
    is_notify_restaurant_after_booking: ""
  });
  const submit = (e) => {
    if (!can.enable_notifications_after_booking_restaurant) {
      toast.error("Vous n'avez pas la permission de modifier ce paramètre");
      return;
    }
    setLoading(true);
    setErrors({
      is_notify_restaurant_after_booking: ""
    });
    axios.put(route(`dashboard.settings.notifications.notify-after-booking-restaurant`, { restaurant: restaurant.id }), {
      is_notify_restaurant_after_booking: e
    }).then((response) => {
      toast.success("Statut modifié !");
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold leading-7 text-lg text-muted-foreground", children: "Notifications du restaurant" }),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Être notifié lors d'une réservation ?",
        description: `Un mail sera envoyé au ${restaurant.email} lorsqu'une réservation sera effectuée.`,
        fieldName: "is_notify_restaurant_after_booking",
        className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0",
        error: (errors == null ? void 0 : errors.is_notify_restaurant_after_booking) ?? "",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: enable,
            disabled: loading || !can.enable_notifications_after_booking_restaurant,
            onCheckedChange: (e) => {
              if (!can.enable_notifications_after_booking_restaurant) {
                toast.error("Vous n'avez pas la permission de modifier ce paramètre");
                return;
              }
              setEnable(() => {
                submit(e);
                return e;
              });
            }
          }
        )
      }
    )
  ] });
};
const __vite_glob_0_37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminNotificationBooking
}, Symbol.toStringTag, { value: "Module" }));
const ClientNotificationBooking = (props) => {
  const { restaurant, loading, setLoading, can } = props;
  const [enable, setEnable] = useState(
    restaurant.is_notify_client_after_booking
  );
  const [errors, setErrors] = useState({
    is_notify_client_after_booking: ""
  });
  const [enableDayBefore, setEnableDayBefore] = useState(
    restaurant.is_notify_client_a_day_before_booking
  );
  const [errorsDayBefore, setErrorsDayBefore] = useState({
    is_notify_client_a_day_before_booking: ""
  });
  const submit = (e) => {
    if (!can.enable_notifications_after_booking_user) {
      toast.error(
        "Vous n'avez pas la permission de modifier ce paramètre"
      );
      return;
    }
    setLoading(true);
    setErrors({
      is_notify_client_after_booking: ""
    });
    axios.put(
      route(
        `dashboard.settings.notifications.notify-after-booking-client`,
        { restaurant: restaurant.id }
      ),
      {
        is_notify_client_after_booking: e
      }
    ).then((response) => {
      toast.success("Statut modifié !");
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  const submitDayBefore = (e) => {
    if (!can.enable_notifications_day_before_booking_user) {
      toast.error(
        "Vous n'avez pas la permission de modifier ce paramètre"
      );
      return;
    }
    setLoading(true);
    setErrorsDayBefore({
      is_notify_client_a_day_before_booking: ""
    });
    axios.put(
      route(
        `dashboard.settings.notifications.notify-day-before-booking-client`,
        { restaurant: restaurant.id }
      ),
      {
        is_notify_client_a_day_before_booking: e
      }
    ).then((response) => {
      toast.success("Statut modifié !");
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold leading-7 text-lg text-muted-foreground", children: "Notifications des clients" }),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Notifier le client après sa réservation ?",
        description: `Un mail sera envoyé au mail du client lorsqu'il aura effectué une réservation.`,
        fieldName: "is_notify_client_after_booking",
        className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0",
        error: (errors == null ? void 0 : errors.is_notify_client_after_booking) ?? "",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            disabled: loading || !can.enable_notifications_after_booking_user,
            checked: enable,
            onCheckedChange: (e) => {
              if (!can.enable_notifications_after_booking_user) {
                toast.error(
                  "Vous n'avez pas la permission de modifier ce paramètre"
                );
                return;
              }
              setEnable(() => {
                submit(e);
                return e;
              });
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Envoyer un rappel au client ?",
        description: `Un mail sera envoyé au mail du client la veille de sa réservation, pour lutter contre les no-shows.`,
        fieldName: "is_notify_client_a_day_before_booking",
        className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0",
        error: (errorsDayBefore == null ? void 0 : errorsDayBefore.is_notify_client_a_day_before_booking) ?? "",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            disabled: loading || !can.enable_notifications_day_before_booking_user,
            checked: enableDayBefore,
            onCheckedChange: (e) => {
              if (!can.enable_notifications_day_before_booking_user) {
                toast.error(
                  "Vous n'avez pas la permission de modifier ce paramètre"
                );
                return;
              }
              setEnableDayBefore(() => {
                submitDayBefore(e);
                return e;
              });
            }
          }
        )
      }
    )
  ] });
};
const __vite_glob_0_39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ClientNotificationBooking
}, Symbol.toStringTag, { value: "Module" }));
const AdminNotificationMessages = (props) => {
  const { restaurant, loading, setLoading, can } = props;
  const [enable, setEnable] = useState(
    restaurant.is_notify_restaurant_after_contact_message
  );
  const [errors, setErrors] = useState({
    is_notify_restaurant_after_contact_message: ""
  });
  const submit = (e) => {
    if (!can.enable_notifications_contact_message_restaurant) {
      toast.error("Vous n'avez pas la permission de modifier ce paramètre");
      return;
    }
    setLoading(true);
    setErrors({
      is_notify_restaurant_after_contact_message: ""
    });
    axios.put(route(`dashboard.settings.notifications.notify-after-message-restaurant`, { restaurant: restaurant.id }), {
      is_notify_restaurant_after_contact_message: e
    }).then((response) => {
      toast.success("Statut modifié !");
    }).catch((error) => {
      toast.error(
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      setErrors(error.response.data.errors);
    }).finally(() => {
      setLoading(false);
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold leading-7 text-lg text-muted-foreground", children: "Notifications du restaurant" }),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        label: "Être notifié lors d'un message de contact ?",
        description: `Un mail sera envoyé au ${restaurant.email} lorsqu'un utilisateur rempli le formulaire de contact.`,
        fieldName: "is_notify_restaurant_after_contact_message",
        className: "flex gap-6 w-full items-center border border-muted rounded-lg p-4 bg-background space-y-0",
        error: (errors == null ? void 0 : errors.is_notify_restaurant_after_contact_message) ?? "",
        children: /* @__PURE__ */ jsx(
          Switch,
          {
            checked: enable,
            disabled: loading || !can.enable_notifications_contact_message_restaurant,
            onCheckedChange: (e) => {
              if (!can.enable_notifications_contact_message_restaurant) {
                toast.error("Vous n'avez pas la permission de modifier ce paramètre");
                return;
              }
              setEnable(() => {
                submit(e);
                return e;
              });
            }
          }
        )
      }
    )
  ] });
};
const __vite_glob_0_38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AdminNotificationMessages
}, Symbol.toStringTag, { value: "Module" }));
const Notifications = (props) => {
  const { can, restaurant } = props;
  const [loading, setLoading] = useState(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-semibold tracking-wide p-2", children: [
      "Gérer les notifications du restaurant : ",
      restaurant.data.name
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs(
        Card,
        {
          "x-chunk": "settings-notifications-restaurant",
          className: "bg-accent",
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Notifications de réservations" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Gérez les notifications liées à votre module de réservation." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: !restaurant.data.can.accept_booking ? /* @__PURE__ */ jsx(CanNotUseBooking, { restaurant: restaurant.data }) : /* @__PURE__ */ jsxs("div", { className: "md:grid md:grid-cols-2 md:gap-7 bg-background/30 rounded-md p-2", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                AdminNotificationBooking,
                {
                  restaurant: restaurant.data,
                  loading,
                  setLoading,
                  can
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                ClientNotificationBooking,
                {
                  restaurant: restaurant.data,
                  loading,
                  setLoading,
                  can
                }
              ) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Card,
        {
          "x-chunk": "settings-notifications-restaurant",
          className: "bg-accent",
          children: [
            /* @__PURE__ */ jsxs(CardHeader, { className: "px-7", children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Notifications du formulaire de contact" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Gérez les notifications liées à votre formulaire de contact." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { children: !restaurant.data.can.accept_messages ? /* @__PURE__ */ jsx(CanNotUseMessages, { restaurant: restaurant.data }) : /* @__PURE__ */ jsx("div", { className: "md:grid md:grid-cols-2 md:gap-7 bg-background/30 rounded-md p-2", children: /* @__PURE__ */ jsx(
              AdminNotificationMessages,
              {
                restaurant: restaurant.data,
                loading,
                setLoading,
                can
              }
            ) }) })
          ]
        }
      )
    ] })
  ] });
};
Notifications.layout = (page) => {
  return /* @__PURE__ */ jsx(DashboardLayout, { children: page });
};
const __vite_glob_0_34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Notifications
}, Symbol.toStringTag, { value: "Module" }));
function DataTableTables({
  columns,
  data: data2
}) {
  var _a;
  const [sorting, setSorting] = React__default.useState([]);
  const table = useReactTable({
    data: data2,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => {
        return /* @__PURE__ */ jsx(TableHead, { children: header.isPlaceholder ? null : flexRender(
          header.column.columnDef.header,
          header.getContext()
        ) }, header.id);
      }) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No results."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] })
  ] });
}
const __vite_glob_0_43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DataTableTables
}, Symbol.toStringTag, { value: "Module" }));
const createSelectors$4 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useUpdateTable = createSelectors$4(
  create((set) => ({
    openForm: false,
    setOpenForm: (openForm) => set({ openForm }),
    table: null,
    setTable: (table) => set({ table }),
    restaurant: null,
    setRestaurant: (restaurant) => set({ restaurant })
  }))
);
const CellAction = ({ data: data2 }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const setTable = useUpdateTable.use.setTable();
  const setOpenForm = useUpdateTable.use.setOpenForm();
  const restaurant = useUpdateTable.use.restaurant();
  const onConfirm = async () => {
    if (!restaurant)
      return;
    try {
      setLoading(true);
      await axios.delete(`/dashboard/${restaurant.id}/tables/${data2.id}`);
      toast.success("Table supprimée");
      router.reload();
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la suppression de la table"
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      AlertModal,
      {
        isOpen: open,
        onClose: () => setOpen(false),
        onConfirm,
        loading,
        title: "Supression de la table",
        description: "Êtes-vous sûr de vouloir supprimer cette table ? Cette action est irréversible."
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open menu" }),
        /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
        /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
        /* @__PURE__ */ jsxs(
          DropdownMenuItem,
          {
            className: "flex items-center gap-1 cursor-pointer",
            onClick: () => {
              setOpenForm(true);
              setTable(data2);
            },
            children: [
              /* @__PURE__ */ jsx(Edit$2, { className: "w-4 h-4" }),
              "Mettre à jour"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          DropdownMenuItem,
          {
            className: "flex items-center gap-1 cursor-pointer text-destructive focus:text-red-600",
            onClick: () => setOpen(true),
            children: [
              /* @__PURE__ */ jsx(Trash, { className: "w-4 h-4" }),
              "Supprimer"
            ]
          }
        )
      ] })
    ] })
  ] });
};
const __vite_glob_0_41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CellAction
}, Symbol.toStringTag, { value: "Module" }));
const getTableColumns = () => {
  useUpdateTable.use.setTable();
  useUpdateTable.use.setOpenForm();
  const tablesColumns = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              "Nom de la table",
              /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
            ]
          }
        );
      }
    },
    {
      accessorKey: "seats",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              "Nombre de places",
              /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
            ]
          }
        );
      }
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
            children: [
              "Status",
              /* @__PURE__ */ jsx(ArrowUpDown, { className: "ml-2 h-4 w-4" })
            ]
          }
        );
      },
      cell: ({ row }) => {
        const { status } = row.original;
        return /* @__PURE__ */ jsx(
          Badge,
          {
            className: cn(
              status === "Disponible" ? "bg-green-200 text-green-800" : ""
            ),
            children: status
          }
        );
      }
    },
    {
      id: "actions",
      cell: ({ row }) => /* @__PURE__ */ jsx(CellAction, { data: row.original })
    }
  ];
  return tablesColumns;
};
const __vite_glob_0_42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTableColumns
}, Symbol.toStringTag, { value: "Module" }));
const getKeyOfObject = (statusValue, status) => {
  return Object.keys(status).find((key) => status[key] === statusValue);
};
const Tables = ({ auth, tables, status, restaurant }) => {
  const updateTable = useUpdateTable.use.table();
  const open = useUpdateTable.use.openForm();
  const setOpen = useUpdateTable.use.setOpenForm();
  const setTable = useUpdateTable.use.setTable();
  const setRestaurant = useUpdateTable.use.setRestaurant();
  const tableColumns = getTableColumns();
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    id: void 0,
    name: "",
    seats: void 0,
    status: ""
  });
  const [statusKeyReload, setStatusKeyReload] = useState();
  const submit = (e) => {
    e.preventDefault();
    post(`/dashboard/${restaurant.data.id}/tables`, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Nouvelle données enregistrées !");
      },
      onError: (e2) => {
        toast.error(
          "Une erreur est survenue ! Veillez réessayer plus tard."
        );
      }
    });
  };
  useEffect(() => {
    if (updateTable) {
      const key = getKeyOfObject(updateTable.status, status);
      setStatusKeyReload(Date.now());
      setData({
        //@ts-ignore
        name: updateTable.name,
        id: updateTable.id,
        seats: updateTable.seats,
        status: key
      });
    }
  }, [updateTable]);
  useEffect(() => {
    if (!open) {
      reset();
      setTable(null);
      setStatusKeyReload(null);
    }
    setStatusKeyReload(Date.now());
  }, [open]);
  useEffect(() => {
    setRestaurant(restaurant.data);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold tracking-wide p-2", children: "Tables" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => setOpen(!open), children: !open ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "hidden md:flex", children: "  Ajouter une table" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Minus, { className: "w-6 h-6" }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:flex", children: "  Annuler" })
      ] }) })
    ] }),
    open && /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: submit,
        className: " border p-6 rounded-xl flex flex-col justify-start gap-5",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                className: "flex-1 min-w-fit",
                label: "Nom de la table",
                fieldName: "name",
                error: errors.name,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "name",
                    type: "text",
                    name: "name",
                    value: data2.name,
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => setData("name", e.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                className: "flex-1 min-w-fit",
                label: "Nombre de places",
                fieldName: "seats",
                error: errors.seats,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "seats",
                    type: "number",
                    min: 1,
                    step: 1,
                    name: "seats",
                    value: data2.seats ?? "",
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => (
                      //@ts-ignore
                      setData("seats", parseInt(e.target.value))
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                className: "flex-1 min-w-fit",
                label: "Status",
                fieldName: "status",
                error: errors.status,
                children: /* @__PURE__ */ jsxs(
                  Select,
                  {
                    onValueChange: (e) => {
                      setData("status", e);
                    },
                    defaultValue: data2.status,
                    children: [
                      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir un status" }) }),
                      /* @__PURE__ */ jsx(SelectContent, { id: "status", children: Object.keys(status).map((key) => /* @__PURE__ */ jsx(SelectItem, { value: key, children: status[key] }, key)) })
                    ]
                  },
                  statusKeyReload
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 justify-center", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => setOpen(false),
                variant: "secondary",
                type: "button",
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsx(SubmitButton, { type: "submit", disabled: processing, children: "Valider" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(DataTableTables, { columns: tableColumns, data: tables.data })
  ] });
};
Tables.layout = (page) => {
  return /* @__PURE__ */ jsx(
    DashboardLayout,
    {
      children: page
    }
  );
};
const __vite_glob_0_40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tables
}, Symbol.toStringTag, { value: "Module" }));
const Error403 = () => {
  return /* @__PURE__ */ jsx("div", { children: "Error403" });
};
const __vite_glob_0_44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Error403
}, Symbol.toStringTag, { value: "Module" }));
const Error404 = () => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx("h1", { children: "Error 404" }),
  /* @__PURE__ */ jsx("p", { children: "Restaurant not found" })
] });
const __vite_glob_0_45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Error404
}, Symbol.toStringTag, { value: "Module" }));
var IconSize = /* @__PURE__ */ ((IconSize2) => {
  IconSize2["xs"] = "12";
  IconSize2["sm"] = "16";
  IconSize2["md"] = "24";
  IconSize2["lg"] = "32";
  IconSize2["xl"] = "40";
  return IconSize2;
})(IconSize || {});
const Icon = ({
  name,
  testId,
  className,
  size = "md",
  ...props
}) => {
  const absoluteHref = `${window.location.origin}/`;
  const iconSize = IconSize[size];
  const iconClasses = cn("inline-block flex-shrink-0", className);
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: iconClasses,
      fill: "currentColor",
      stroke: "currentColor",
      width: iconSize,
      height: iconSize,
      "data-testid": testId,
      "data-name": name,
      ...props,
      children: /* @__PURE__ */ jsx("use", { href: `${absoluteHref}Icons/icon/icon.svg#${name}` })
    }
  );
};
const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5
    }
  }
};
const svgVariants = {
  close: {
    rotate: 360
  },
  open: {
    rotate: 180
  }
};
const ProfileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();
  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector("nav");
      const projectNav = document.querySelector("#project-navigation");
      if (selectedProject === null) {
        if (nav && !nav.contains(event.target)) {
          setIsOpen(false);
        }
      } else {
        if (nav && !nav.contains(event.target) && projectNav && !projectNav.contains(event.target)) {
          setIsOpen(false);
          setSelectedProject(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProject]);
  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "sticky left-0 top-0 z-10 h-fit", children: /* @__PURE__ */ jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxs(
    motion.nav,
    {
      variants: containerVariants,
      animate: containerControls,
      initial: "close",
      className: "absolute left-0 top-0 flex h-fit min-h-full flex-col justify-start gap-24 border border-r bg-secondary p-5 shadow",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full flex-row place-items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-700" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "flex rounded-full p-1",
              onClick: () => handleOpenClose(),
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1,
                  stroke: "currentColor",
                  className: "h-8 w-8 stroke-secondary-foreground/80",
                  children: /* @__PURE__ */ jsx(
                    motion.path,
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      variants: svgVariants,
                      animate: svgControls,
                      d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
                      transition: {
                        duration: 0.5,
                        ease: "easeInOut"
                      }
                    }
                  )
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Profil",
              href: route("profile.edit"),
              active: route().current("profile.edit"),
              children: /* @__PURE__ */ jsx(Icon, { name: "user", className: "w-8 min-w-8 h-8 stroke-inherit stroke-[0.75]" })
            }
          ),
          /* @__PURE__ */ jsx(
            NavigationLink,
            {
              name: "Abonnement",
              href: route("billings.edit"),
              active: route().current("billings.edit"),
              children: /* @__PURE__ */ jsx(Icon, { name: "credit-card", className: "w-8 min-w-8 h-8 stroke-inherit stroke-[0.75]" })
            }
          ),
          /* @__PURE__ */ jsx(
            ProjectLink,
            {
              name: "Paramètres",
              active: false,
              setSelectedProject,
              className: "flex cursor-pointer place-items-center gap-3 rounded stroke-secondary-foreground/60 stroke-[0.75] p-1 text-red-600 text-secondary-foreground/60 transition-colors duration-100 hover:bg-secondary-foreground/80 hover:stroke-muted hover:text-muted",
              children: /* @__PURE__ */ jsx(Icon, { name: "settings", className: "h-8 w-8 min-w-8 stroke-inherit stroke-[0.75]" })
            }
          )
        ] })
      ]
    }
  ) }) }) });
};
const ProfileNavbar = () => {
  return /* @__PURE__ */ jsx("div", { className: "border-b", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 items-center px-4 md:px-10", children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "link",
        onClick: () => {
          router.visit("/dashboard");
        },
        children: "Retour au tableau de bord"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx(ModeToggle, {}),
      /* @__PURE__ */ jsx(UserAvatar, {})
    ] })
  ] }) });
};
function ProfileLayout({
  header,
  children
}) {
  const props = usePage().props;
  props.auth.user;
  const flash = usePage().props.flash;
  useEffect(() => {
    if (flash == null ? void 0 : flash.message) {
      setTimeout(() => {
        toast.success(flash.message);
      }, 500);
    }
    if (flash == null ? void 0 : flash.error) {
      setTimeout(() => {
        toast.error(flash.error);
      }, 500);
    }
  }, [flash == null ? void 0 : flash.message, flash == null ? void 0 : flash.error]);
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(ToastProvider, { children: [
    /* @__PURE__ */ jsx(ModalProvider, {}),
    /* @__PURE__ */ jsxs("main", { className: "w-full h-full flex flex-row relative", children: [
      /* @__PURE__ */ jsx(ProfileNavigation, {}),
      /* @__PURE__ */ jsxs("section", { className: "w-full ml-20", children: [
        /* @__PURE__ */ jsx(ProfileNavbar, {}),
        /* @__PURE__ */ jsxs("section", { className: "flex flex-col p-2 md:p-10 gap-5 relative z-0", children: [
          header,
          children
        ] })
      ] })
    ] })
  ] }) });
}
const formatPriceFromCents = (price, withCents) => {
  if (withCents) {
    return Number(price / 100).toFixed(2).replace(".", ",");
  } else {
    return Number(price / 100).toFixed(0).replace(".", ",");
  }
};
const formatPrice = (price) => {
  return Number(price).toFixed(2).replace(".", ",");
};
const transformMonthPriceToYearPrice = (price) => {
  const newPrice = Number(price * 12);
  return formatPrice(newPrice);
};
function CancelSubscription({
  className = "",
  subscriptions
}) {
  const [confirmingSubscriptionDeletion, setConfirmingSubscriptionDeletion] = useState(false);
  const passwordInput = useRef(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState(
    null
  );
  const confirmSubscriptionDeletion = () => {
    setConfirmingSubscriptionDeletion(true);
  };
  const closeModal = () => {
    setConfirmingSubscriptionDeletion(false);
    setSubscriptionId(null);
    setSubscriptionName(null);
  };
  const onDelete = () => {
    router.delete("/subscribe/cancel", {
      data: {
        sub_name: subscriptionName,
        id: subscriptionId
      },
      preserveScroll: true,
      onSuccess: () => {
        closeModal(), toast.success("Abonnement annulé avec succès");
      },
      onError: () => {
        var _a;
        return (_a = passwordInput.current) == null ? void 0 : _a.focus();
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-foreground", children: "Abonnement(s)" }) }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2 ", children: subscriptions == null ? void 0 : subscriptions.map((subscription) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex w-full items-center gap-5 p-4",
        children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[15px] font-semibold tracking-wide text-foreground", children: [
            subscription.name,
            " :",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-normal", children: subscription.recurrence === "monthly" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              formatPriceFromCents(
                subscription.price,
                true
              ),
              " ",
              "€/",
              "mois"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              transformMonthPriceToYearPrice(
                parseInt(
                  formatPriceFromCents(
                    subscription.price,
                    true
                  )
                )
              ),
              " ",
              "€/",
              "an"
            ] }) })
          ] }),
          subscription.isOnGracePeriod ? /* @__PURE__ */ jsx(Fragment, { children: subscription.ends_at && /* @__PURE__ */ jsxs("small", { className: "text-sm", children: [
            "Cet abonnement prendra fin le :",
            " ",
            new Date(
              subscription.ends_at
            ).toLocaleDateString("fr-FR")
          ] }) }) : /* @__PURE__ */ jsx(
            Button,
            {
              variant: "link",
              size: "sm",
              className: "text-destructive font-tight tracking-tighter",
              onClick: () => {
                confirmSubscriptionDeletion();
                setSubscriptionId(subscription.id);
                setSubscriptionName(subscription.name);
              },
              children: "Annuler"
            }
          )
        ]
      },
      subscription.id
    )) }),
    /* @__PURE__ */ jsx(
      AlertModal,
      {
        isOpen: confirmingSubscriptionDeletion,
        onClose: closeModal,
        onConfirm: onDelete,
        loading,
        title: "Êtes-vous sûr de vouloir supprimer votre abonnement ?",
        description: "Cette action est irréversible. Vous perdrez accès aux fonctionnalités de votre abonnement."
      }
    )
  ] });
}
const __vite_glob_0_48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CancelSubscription
}, Symbol.toStringTag, { value: "Module" }));
const Invoices = ({ invoices }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("header", { className: "mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-foreground", children: "Mes factures" }) }),
    invoices.map((invoice) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("span", { children: new Date(invoice.created * 1e3).toLocaleDateString(
        "fr-FR"
      ) }),
      /* @__PURE__ */ jsxs("span", { children: [
        (invoice.total / 100).toFixed(2),
        " €"
      ] }),
      /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(
        "a",
        {
          className: "text-primaryBlue underline",
          href: "/user/invoice/" + invoice.id,
          children: "Télécharger"
        }
      ) })
    ] }, invoice.id))
  ] });
};
const __vite_glob_0_50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Invoices
}, Symbol.toStringTag, { value: "Module" }));
const createSelectors$3 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useHandlePaymentMethodModal = createSelectors$3(create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
})));
const ConfirmDelete = (props) => {
  const { idToDelete, setIdToDelete, setShowDeleteConfirm, setShowUpdateMethod } = props;
  const { data: data2, delete: deletePaymentMethod, processing } = useForm({
    id: idToDelete
  });
  const resetDelete = () => {
    setIdToDelete(null);
    setShowDeleteConfirm(false);
    setShowUpdateMethod(true);
  };
  const confirmDelete = () => {
    if (!data2.id) {
      return toast.error("Une erreur s'est produite lors de la suppression de votre méthode de paiement. Veuillez réessayer plus tard ou nous contacter.");
    }
    deletePaymentMethod(route("billings.payment-method.delete", { id: data2.id }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Votre méthode de paiement a été supprimée avec succès.");
        setIdToDelete(null);
        setShowDeleteConfirm(false);
        setShowUpdateMethod(true);
      },
      onError: () => {
        setIdToDelete(null);
        setShowDeleteConfirm(false);
        setShowUpdateMethod(true);
        toast.error("Une erreur s'est produite lors de la suppression de votre méthode de paiement. Veuillez réessayer plus tard ou nous contacter.");
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-[45vh] w-full overflow-y-auto", children: [
    /* @__PURE__ */ jsx("p", { className: "mt-8 text-sm font-normal tracking-tight", children: "Souhaitez-vous supprimé votre méthode de paiement ? Ceci est irréversible." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 flex w-full items-center justify-center gap-6", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          className: "h-16 w-16 rounded-full p-3 px-0 py-0",
          onClick: resetDelete,
          disabled: processing,
          children: /* @__PURE__ */ jsx(Icon, { name: "x", className: "h-9 w-9" })
        }
      ),
      idToDelete && /* @__PURE__ */ jsx(
        SubmitButton,
        {
          variant: "destructive",
          type: "button",
          className: "h-16 w-16 rounded-full p-3 px-0 py-0",
          onClick: confirmDelete,
          disabled: processing,
          children: /* @__PURE__ */ jsx(Icon, { name: "check", className: "h-9 w-9" })
        }
      )
    ] })
  ] });
};
const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
const UpdatePaymentMethod = (props) => {
  const {
    paymentMethods,
    defaultPaymentMethod,
    openConfirmDeletion,
    setShowSubmitButton,
    showSubmitButton,
    onClose
  } = props;
  const { data: data2, processing, errors, put, reset } = useForm({
    id: defaultPaymentMethod.id
  });
  const submit = () => {
    put(route("billings.payment-method.update", { id: data2.id }), {
      preserveScroll: true,
      onSuccess: () => {
        setShowSubmitButton(false);
        onClose();
        toast.success("Votre méthode de paiement a été mise à jour.");
      },
      onError: (e) => {
        reset();
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { children: [
    paymentMethods && paymentMethods.length > 0 && /* @__PURE__ */ jsxs("div", { className: "max-h-[45vh] w-full overflow-y-auto border p-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-md mb-4 font-semibold text-foreground/70", children: [
        "Vos cartes enregistrées :",
        " "
      ] }),
      /* @__PURE__ */ jsx(
        RadioGroup,
        {
          onValueChange: (e) => {
            setShowSubmitButton(true);
            data2.id = e;
          },
          defaultValue: data2.id,
          children: paymentMethods.map((paymentMethod) => {
            {
              return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-8 items-center gap-2", children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "col-span-7 flex h-16 w-full cursor-pointer items-center space-x-2 rounded-lg border p-1",
                      paymentMethod.id === defaultPaymentMethod.id && "bg-primary/10"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        RadioGroupItem,
                        {
                          value: paymentMethod.id,
                          id: paymentMethod.id,
                          className: "cursor-pointer"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Label,
                        {
                          htmlFor: paymentMethod.id,
                          className: "flex h-full w-full cursor-pointer items-center",
                          children: [
                            /* @__PURE__ */ jsx(
                              Icon,
                              {
                                name: paymentMethod.card.brand,
                                className: "mr-3 h-12 w-12 text-current"
                              }
                            ),
                            "**** **** ****",
                            " ",
                            defaultPaymentMethod.card.last4,
                            " ",
                            "-",
                            " ",
                            paymentMethod.card.exp_month,
                            "/",
                            paymentMethod.card.exp_year
                          ]
                        }
                      )
                    ]
                  },
                  paymentMethod.id
                ),
                paymentMethod.id !== defaultPaymentMethod.id && /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "xs",
                    onClick: () => {
                      openConfirmDeletion(
                        paymentMethod.id
                      );
                    },
                    children: /* @__PURE__ */ jsx(
                      Icon,
                      {
                        name: "trash",
                        className: "h-5 w-5 text-destructive"
                      }
                    )
                  }
                )
              ] });
            }
          })
        }
      )
    ] }),
    showSubmitButton && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex w-full items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          type: "button",
          className: "w-full",
          disabled: processing,
          onClick: () => {
            setShowSubmitButton(false);
          },
          children: "Annuler"
        }
      ),
      /* @__PURE__ */ jsx(
        SubmitButton,
        {
          disabled: processing,
          onClick: submit,
          className: "w-full",
          children: "Mettre à jour"
        }
      )
    ] })
  ] }) });
};
const AddNewPaymentMethod = (props) => {
  const { stripeKey, intent, onReset } = props;
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stripeInstance = window.Stripe(stripeKey);
    setStripe(stripeInstance);
    setLoading(false);
  }, [stripeKey]);
  useEffect(() => {
    if (stripe) {
      setLoading(true);
      const clientSecret = intent.client_secret;
      const elementsInstance = stripe.elements({ clientSecret });
      setElements(elementsInstance);
      const paymentElementOptions = {
        layout: "tabs"
      };
      const paymentElement = elementsInstance.create(
        "payment",
        paymentElementOptions
      );
      paymentElement.mount("#payment-element");
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [stripe]);
  const { data: data2, processing, post, reset } = useForm({
    paymentMethod: ""
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:8000/billings"
      },
      redirect: "if_required"
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else {
      data2.paymentMethod = setupIntent.payment_method;
      post(route("billings.payment-method.create-new"), {
        ...data2,
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Votre méthode de paiement a été ajoutée.");
          onReset();
        },
        onError: (e2) => {
          reset();
          toast.error("Une erreur est survenue. Veuillez réessayer.");
        }
      });
    }
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("form", { id: "payment-form", onSubmit, children: [
    /* @__PURE__ */ jsx("div", { id: "payment-element" }),
    /* @__PURE__ */ jsx(
      SubmitButton,
      {
        disabled: processing || loading,
        className: "my-6 w-full",
        id: "card-button",
        type: "submit",
        children: "Ajouter"
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "payment-message", className: "hidden" })
  ] }) });
};
const HandlePaymentMethodModal = (props) => {
  const { paymentMethods, defaultPaymentMethod, intent, stripeKey } = props;
  const isOpen = useHandlePaymentMethodModal.use.isOpen();
  const onClose = useHandlePaymentMethodModal.use.onClose();
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [showUpdateMethod, setShowUpdateMethod] = useState(true);
  const [idToDelete, setIdToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const openConfirmDeletion = (id) => {
    setIdToDelete(id);
    setShowDeleteConfirm(true);
    setShowUpdateMethod(false);
  };
  const onReset = () => {
    setShowUpdateMethod(true);
    setShowAddMethod(false);
    onClose();
  };
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      title: `Modifier vos moyens de paiement`,
      isOpen,
      onClose: () => {
        onReset();
      },
      children: [
        !showUpdateMethod && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
          Button,
          {
            size: "xs",
            variant: "link",
            onClick: () => {
              setShowUpdateMethod(true);
            },
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Icon, { name: "arrow-left", className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { children: "Retour à mes cartes" })
            ]
          }
        ) }),
        showUpdateMethod && /* @__PURE__ */ jsx(
          UpdatePaymentMethod,
          {
            defaultPaymentMethod,
            openConfirmDeletion,
            setShowSubmitButton,
            paymentMethods,
            showSubmitButton,
            onClose
          }
        ),
        showDeleteConfirm && /* @__PURE__ */ jsx(
          ConfirmDelete,
          {
            idToDelete,
            setShowDeleteConfirm,
            setShowUpdateMethod,
            setIdToDelete
          }
        ),
        showAddMethod && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
          AddNewPaymentMethod,
          {
            intent,
            stripeKey,
            onReset
          }
        ) }),
        showUpdateMethod && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => {
              setShowUpdateMethod(false);
              setShowAddMethod(true);
            },
            variant: "ghost",
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsx(Icon, { name: "plus", className: "h-6 w-6" }),
              /* @__PURE__ */ jsx("span", { children: "Ajouter une nouvelle méthode de paiement" })
            ]
          }
        ) })
      ]
    }
  );
};
const StripeLoader = () => {
  useEffect(() => {
    if (document.querySelector(`script[src="https://js.stripe.com/v3/"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return null;
};
function Edit$1({
  auth,
  subscriptions,
  invoices,
  paymentMethods,
  defaultPaymentMethod,
  intent,
  stripeKey
}) {
  var _a;
  const onOpen = useHandlePaymentMethodModal.use.onOpen();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Abonnements" }),
    /* @__PURE__ */ jsx(StripeLoader, {}),
    /* @__PURE__ */ jsx(
      HandlePaymentMethodModal,
      {
        intent,
        stripeKey,
        paymentMethods,
        defaultPaymentMethod
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-secondary p-4 shadow sm:rounded-lg sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-foreground", children: "Informations de paiement" }),
          paymentMethods.length > 0 && /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: onOpen,
              children: /* @__PURE__ */ jsx(
                Icon,
                {
                  name: "pencil",
                  className: "h-5 w-5 text-foreground"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { children: defaultPaymentMethod && /* @__PURE__ */ jsxs("div", { className: "mt-10 w-fit rounded-lg bg-white p-6 shadow-md", children: [
          /* @__PURE__ */ jsxs("p", { className: "mb-4 text-lg font-semibold text-gray-700", children: [
            "Votre méthode de paiement par défaut :",
            " "
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx(
              Icon,
              {
                name: defaultPaymentMethod.card.brand,
                className: "mr-3 h-12 w-12 text-current"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-700", children: [
              "**** **** ****",
              " ",
              defaultPaymentMethod.card.last4
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-500", children: [
            "Validité :",
            " ",
            defaultPaymentMethod.card.exp_month,
            "/",
            defaultPaymentMethod.card.exp_year
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-secondary p-4 shadow sm:rounded-lg sm:p-8", children: ((_a = auth.user) == null ? void 0 : _a.isSub) ? /* @__PURE__ */ jsx(
        CancelSubscription,
        {
          className: "",
          subscriptions
        }
      ) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { children: "Vous n'avez pas d'abonnement actif" }) }) }),
      invoices && invoices.length > 0 && /* @__PURE__ */ jsx("div", { className: "bg-secondary p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(Invoices, { invoices }) })
    ] }) })
  ] });
}
Edit$1.layout = (page) => {
  return /* @__PURE__ */ jsx(
    ProfileLayout,
    {
      header: /* @__PURE__ */ jsx("h1", { className: "p-2 text-4xl font-semibold tracking-wide", children: "Abonnements" }),
      children: page
    }
  );
};
const __vite_glob_0_46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit$1
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: cn(disabled && "opacity-25", "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150", className),
      disabled,
      children
    }
  );
}
function SecondaryButton({ type = "button", className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: cn(disabled && "opacity-25", "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150", className),
      disabled,
      children
    }
  );
}
function DeleteUserForm({
  className = ""
}) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef(null);
  const {
    data: data2,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        var _a;
        return (_a = passwordInput.current) == null ? void 0 : _a.focus();
      },
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-foreground", children: "Supprimer mon compte" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Une fois le compte supprimé, toutes les données sont définitivement perdues. Veuillez télécharger toutes les données ou informations que vous souhaitez conserver." })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "destructive", size: "sm", onClick: confirmUserDeletion, children: "Supprimer" }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        title: "Êtes-vous sûr de vouloir supprimer votre compte ?",
        description: "Une fois le compte supprimé, les données seront définitivement perdues. Veuillez entrer votre mot de passe pour confirmer la suppression.",
        isOpen: confirmingUserDeletion,
        onClose: closeModal,
        children: /* @__PURE__ */ jsx("div", { className: "space-x-2 flex items-center justify-end w-full", children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: " w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Mot de passe",
                fieldName: "password",
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "password",
                    id: "password",
                    placeholder: "Mot de passe",
                    name: "password",
                    value: data2.password,
                    onChange: (e) => setData("password", e.target.value)
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password,
                className: "mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
            /* @__PURE__ */ jsx(SecondaryButton, { className: "bg-primary hover:bg-primary/80 transition-colors text-muted py-2.5 font-normal text-xs", onClick: closeModal, children: "Annuler" }),
            /* @__PURE__ */ jsx(
              DangerButton,
              {
                className: "ms-3 font-normal text-xs",
                disabled: processing,
                children: "Supprimer le compte"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
const __vite_glob_0_49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({
  className = ""
}) {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  const {
    data: data2,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        var _a, _b;
        if (errors2.password) {
          reset("password", "password_confirmation");
          (_a = passwordInput.current) == null ? void 0 : _a.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          (_b = currentPasswordInput.current) == null ? void 0 : _b.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Modifier le mot de passe" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Assurez-vous d'utiliser un mot de passe long et sécurisé." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          label: "Mot de passe actuel",
          fieldName: "current_password",
          error: errors.current_password,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "current_password",
              ref: currentPasswordInput,
              value: data2.current_password,
              onChange: (e) => setData("current_password", e.target.value),
              type: "password",
              autoComplete: "current-password"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          label: "Nouveau mot de passe",
          fieldName: "password",
          error: errors.password,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              ref: passwordInput,
              value: data2.password,
              onChange: (e) => setData("password", e.target.value),
              type: "password",
              autoComplete: "new-password"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          label: "Confirmer le mot de passe",
          fieldName: "password_confirmation",
          error: errors.password_confirmation,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "password_confirmation",
              value: data2.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value),
              type: "password",
              autoComplete: "new-password"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Enregistrer" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Enregistré." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const { data: data2, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-foreground", children: "Information du profil" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Modifier vos informations de profil et votre adresse e-mail." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          label: "Nom",
          fieldName: "name",
          error: errors.name,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: data2.name,
              onChange: (e) => setData("name", e.target.value),
              required: true,
              autoComplete: "name"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          label: "Email",
          fieldName: "email",
          error: errors.email,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: data2.email,
              onChange: (e) => setData("email", e.target.value),
              required: true,
              autoComplete: "username"
            }
          )
        }
      ),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2 text-gray-800", children: [
          "Votre adresse mail n'est pas vérifié. ",
          " ",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "underline text-sm text-primaryBlue hover:text-primaryBlue/60 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: "Cliquez pour renvoyer un mail."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600", children: "Un nouveau lien vous a été envoyé par mail." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Enregistrer" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Enregistré." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({
  auth,
  mustVerifyEmail,
  status
}) {
  usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto space-y-6 ", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-secondary p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(
        UpdateProfileInformation,
        {
          mustVerifyEmail,
          status,
          className: "max-w-xl"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "bg-secondary p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-secondary p-4 shadow sm:rounded-lg sm:p-8", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
    ] }) })
  ] });
}
Edit.layout = (page) => {
  return /* @__PURE__ */ jsx(
    ProfileLayout,
    {
      header: /* @__PURE__ */ jsx("h1", { className: "p-2 text-4xl font-semibold tracking-wide", children: "Profil" }),
      children: page
    }
  );
};
const __vite_glob_0_47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
const Index$3 = (props) => {
  const { restaurant } = props;
  const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
  const contactModalSetRestaurant = useContactRestaurantModal.use.setRestaurant();
  const contactModalIsOpen = useContactRestaurantModal.use.isOpen();
  useEffect(() => {
    contactModalOnOpen();
    contactModalSetRestaurant(restaurant.data);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "w-full min-h-screen bg-primary/50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      Head,
      {
        title: `Page de contact du restaurant ${restaurant.data.name}`
      }
    ),
    !contactModalIsOpen && /* @__PURE__ */ jsx("p", { className: "p-3 rounded-md bg-background", children: "Si vous nous avez transmis un message nous vous recontacterons au plus vite !" }),
    /* @__PURE__ */ jsx(ContactRestaurant, {})
  ] });
};
const __vite_glob_0_53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
const RatingForm = (props) => {
  const { items, ratings, setRatings, setComment } = props;
  const [hoverRatings, setHoverRatings] = useState({});
  const starRatings = {
    1: "Mauvais",
    2: "Moyen",
    3: "Bon",
    4: "Très bon !",
    5: "Excellent !"
  };
  const handleMouseEnter = (index, itemId) => {
    setHoverRatings((prev) => ({ ...prev, [itemId]: index }));
  };
  const handleMouseLeave = (itemId) => {
    setHoverRatings((prev) => ({ ...prev, [itemId]: null }));
  };
  const handleClick = (index, itemId) => {
    setRatings((prev) => ({ ...prev, [itemId]: index }));
  };
  const maxCharacters = 255;
  const [text, setText] = useState("");
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  const charactersRemaining = maxCharacters - text.length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "md:grid md:grid-cols-2 gap-8 w-full", children: items.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "\n                md:my-4 my-10\n                col-span-1\n                flex items-center justify-center flex-col",
        children: [
          /* @__PURE__ */ jsx("label", { className: "font-semibold text-lg", children: item.name }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: [1, 2, 3, 4, 5].map((index) => {
            index <= (hoverRatings[item.id] || ratings[item.id] || 0);
            const isHovered = hoverRatings[item.id] && hoverRatings[item.id] >= index;
            const isSelected = ratings[item.id] && ratings[item.id] >= index;
            const isHoverSupToIndex = hoverRatings[item.id] && hoverRatings[item.id] > index;
            const isHoverEqualToIndex = hoverRatings[item.id] && hoverRatings[item.id] === index;
            return /* @__PURE__ */ jsx(
              "div",
              {
                onMouseEnter: () => handleMouseEnter(index, item.id),
                onMouseLeave: () => handleMouseLeave(item.id),
                onClick: () => handleClick(index, item.id),
                className: "p-2 cursor-pointer",
                children: /* @__PURE__ */ jsx(
                  Star$1,
                  {
                    color: "#FFD700",
                    className: cn(
                      isHoverSupToIndex && "scale-[135%]",
                      isHoverEqualToIndex && "scale-[175%]",
                      // isHovered && "opacity-[100%] fill-[#FFD700]",
                      !isHovered && isSelected && "opacity-[60%]",
                      (isSelected || isHovered) && "fill-[#FFD700]",
                      "transition-all ease-in-out duration-200 w-10 h-10"
                    )
                  }
                )
              },
              index
            );
          }) }),
          /* @__PURE__ */ jsx("p", { children: ratings[item.id] ? starRatings[ratings[item.id]] : hoverRatings[item.id] ? starRatings[hoverRatings[item.id]] : " " })
        ]
      },
      item.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "md:px-20 px-6", children: [
      /* @__PURE__ */ jsx("label", { className: "font-semibold text-lg", children: "Commentaire" }),
      /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full", children: [
        /* @__PURE__ */ jsx(
          Textarea,
          {
            maxLength: maxCharacters,
            value: text,
            onChange: (e) => {
              handleTextChange(e);
              setComment(e.target.value);
            },
            className: "resize-none h-24"
          }
        ),
        /* @__PURE__ */ jsxs("small", { className: "absolute bottom-1 right-2 text-muted-foreground", children: [
          charactersRemaining,
          " caractère(s) restant(s)"
        ] })
      ] })
    ] })
  ] });
};
const __vite_glob_0_55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RatingForm
}, Symbol.toStringTag, { value: "Module" }));
const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const StarButton = ({
  disabled,
  type,
  buttonText,
  onClick,
  isSubmitted,
  setIsSubmitted,
  className,
  starClasses,
  countOfStars,
  ...props
}) => {
  const [scope, animate2] = useAnimate();
  useEffect(() => {
    if (isSubmitted) {
      onSubmitButton();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);
  const onSubmitButton = () => {
    const sparkles = Array.from({ length: countOfStars ?? 20 });
    const sparklesAnimation = sparkles.map(
      (_, index) => [
        `.sparkle-${index}`,
        {
          x: randomNumberBetween(-100, 100),
          y: randomNumberBetween(-100, 100),
          scale: randomNumberBetween(1.5, 2.5),
          opacity: 1
        },
        {
          duration: 0.4,
          at: "<"
        }
      ]
    );
    const sparklesFadeOut = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0
      },
      {
        duration: 0.3,
        at: "<"
      }
    ]);
    const sparklesReset = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0
      },
      {
        duration: 1e-6
      }
    ]);
    animate2([
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 1e-6 }],
      ...sparklesFadeOut
    ]);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center h-16 z-10 relative", children: /* @__PURE__ */ jsx("div", { ref: scope, children: /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      disabled,
      type: type || "button",
      onClick,
      className: cn(
        "relative disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-2xl border-2 border-blue-500 px-6 py-2 text-2xl text-blue-500 transition-colors hover:bg-blue-100",
        className
      ),
      children: disabled ? /* @__PURE__ */ jsx("div", { className: "w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "w-6 h-6 animate animate-spin" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: buttonText }),
        /* @__PURE__ */ jsx("span", { className: "block h-8 overflow-hidden", "aria-hidden": true, children: buttonText.split("").map((letter, index) => /* @__PURE__ */ jsx(
          "span",
          {
            "data-letter": letter,
            className: "letter relative inline-block h-8 leading-8 after:absolute after:left-0 after:top-full after:h-8 after:content-[attr(data-letter)]",
            children: letter
          },
          `${letter}-${index}`
        )) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 -z-10 block",
            children: Array.from({ length: countOfStars ?? 20 }).map(
              (_, index) => /* @__PURE__ */ jsx(
                "svg",
                {
                  className: `absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`,
                  viewBox: "0 0 122 117",
                  width: "6",
                  height: "6",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: cn(
                        "fill-blue-500",
                        starClasses
                      ),
                      d: "M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
                    }
                  )
                },
                index
              )
            )
          }
        )
      ] })
    }
  ) }) });
};
const Index$2 = (props) => {
  const { errorMessage, items, token, successMessage } = props;
  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState(null);
  const [successSection, setSuccessSection] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleRatingSubmit = async () => {
    const ratingsArray = Object.entries(ratings).map(([item_id, rate]) => ({
      item_id: parseInt(item_id),
      // convertir item_id en nombre
      rate
    }));
    data2.notes = ratingsArray;
    data2.comment = comment;
    post(route("rating.store"), {
      preserveScroll: true,
      onSuccess: () => {
        setSuccessSection(true);
        router.visit("/rating?success=true");
      },
      onError: (error) => {
        setIsSubmitted(false);
        console.log(error);
      }
    });
  };
  const { data: data2, post, processing, errors } = useForm({
    comment: null,
    token,
    notes: [
      { item_id: null, rate: null }
    ]
  });
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center bg-gradient-to-b from-yellow-300 to-pink-800 min-h-screen", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl bg-white mx-auto w-full border rounded-md shadow-sm", children: errorMessage ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: "\n                        flex flex-col place-items-center\n                        bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
      role: "alert",
      children: [
        /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Erreur!" }),
        /* @__PURE__ */ jsx("span", { className: "block sm:inline", children: errorMessage })
      ]
    }
  ) : /* @__PURE__ */ jsx(Fragment, { children: successMessage ? /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsx("h1", { className: "text-xl tracking-tighter font-semibold text-center mb-5", children: successMessage }) }) : /* @__PURE__ */ jsxs("div", { className: "py-6 relative", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl tracking-tighter font-bold text-center mb-5", children: "Notez votre visite au restaurant !" }),
    /* @__PURE__ */ jsx(
      RatingForm,
      {
        items: items.data,
        ratings,
        setRatings,
        comment,
        setComment
      }
    ),
    /* @__PURE__ */ jsx(
      StarButton,
      {
        className: "border-[1px] border-neutral-800 text-neutral-800 rounded-md text-base px-6 py-1.5\n                        hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-200 ease-in-out\n                        ",
        disabled: processing,
        countOfStars: 12,
        starClasses: "fill-yellow-400",
        onClick: handleRatingSubmit,
        type: "button",
        isSubmitted,
        setIsSubmitted,
        buttonText: "Valider"
      }
    )
  ] }) }) }) });
};
const __vite_glob_0_54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
function Calendar$1({
  className,
  classNames: classNames2,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames2
      },
      components: {
        IconLeft: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
        IconRight: ({ ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
Calendar$1.displayName = "Calendar";
const DateInput = ({
  data: data2,
  setData,
  errors,
  before_today,
  reservation_date,
  disabledDays,
  setGoNext
}) => {
  return /* @__PURE__ */ jsx(
    FormFieldLayout,
    {
      label: "Date de réservation",
      fieldName: "reservation_date",
      error: errors == null ? void 0 : errors.reservation_date,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-full mx-auto flex items-center flex-col",
          ref: reservation_date,
          children: /* @__PURE__ */ jsx(
            Calendar$1,
            {
              locale: fr,
              className: " rounded-lg border",
              mode: "single",
              selected: data2.reservation_date,
              onSelect: (e) => {
                setData("reservation_date", e);
                setGoNext(true);
              },
              disabled: (date) => {
                const adjustedDisabledDays = disabledDays.map(
                  (day) => day === 7 ? 0 : day
                );
                return date < new Date(before_today) || adjustedDisabledDays.includes(date.getDay());
              },
              initialFocus: true
            }
          )
        }
      )
    }
  );
};
const __vite_glob_0_56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DateInput
}, Symbol.toStringTag, { value: "Module" }));
function ResaLayout({
  children,
  name,
  title
}) {
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    /* @__PURE__ */ jsx("div", { className: "bg-foreground\n            min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs(Card, { className: "mx-auto max-w-md md:max-w-md md:min-w-[400px] pt-5 pb-5", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "pb-6 text-center", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: title }),
        /* @__PURE__ */ jsx(CardDescription, { children: name })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "max-w-sm mx-auto", children })
    ] }) }),
    /* @__PURE__ */ jsx(ContactRestaurant, {})
  ] });
}
const TimeAndGuestSelector = ({
  data: data2,
  setData,
  errors,
  services,
  loading,
  timeState,
  transformedServices
}) => {
  return /* @__PURE__ */ jsx("div", { children: !loading ? /* @__PURE__ */ jsx(Fragment, { children: transformedServices && transformedServices.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "border p-2 rounded-lg", children: [
      /* @__PURE__ */ jsxs(Label, { className: "text-md", children: [
        " ",
        "Heures de service"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center", children: transformedServices.map((service) => {
        const startTime = service.start_time_with_option ? service.start_time_with_option.split(":").slice(0, 2).join("h") : service.start_time.split(":").slice(0, 2).join("h");
        const endTime = service.end_time_with_option ? service.end_time_with_option.split(":").slice(0, 2).join("h") : service.end_time.split(":").slice(0, 2).join("h");
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "w-full grid gap-1",
            children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "time", children: service.name }),
              /* @__PURE__ */ jsxs("small", { children: [
                startTime,
                " - ",
                endTime
              ] })
            ]
          },
          service.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        fieldName: "time",
        error: errors.time,
        label: "Choisir l'heure de réservation",
        children: /* @__PURE__ */ jsx(
          TimeField,
          {
            label: "Choisir l'heure de réservation",
            value: timeState.timeValue ?? void 0,
            onChange: (value) => {
              timeState.setTimeValue(value);
              const { hour, minute } = value;
              const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
              setData("time", time);
            }
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        fieldName: "guests",
        error: errors.guests,
        label: "Combien d'invités ?",
        children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "number",
            min: 1,
            step: 1,
            onChange: (e) => {
              setData(`guests`, e.target.value);
            },
            value: data2.guests
          }
        )
      }
    )
  ] }) : /* @__PURE__ */ jsx("small", { children: "Aucun service disponible pour le jour sélectionné" }) }) : /* @__PURE__ */ jsx("div", { children: "Loading" }) });
};
const __vite_glob_0_59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TimeAndGuestSelector
}, Symbol.toStringTag, { value: "Module" }));
const TableInput = ({
  data: data2,
  setData,
  errors,
  tables,
  setGoNext
}) => {
  var _a;
  return /* @__PURE__ */ jsx(Fragment, { children: tables && tables.length > 0 ? /* @__PURE__ */ jsx(
    FormFieldLayout,
    {
      label: "Choix de la table",
      fieldName: "table_id",
      error: errors.table_id,
      children: /* @__PURE__ */ jsxs(
        Select,
        {
          onValueChange: (e) => {
            setData("table_id", e);
            if (setGoNext)
              setGoNext(true);
          },
          defaultValue: void 0,
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(
              SelectValue,
              {
                defaultValue: (_a = data2.table_id) == null ? void 0 : _a.toString(),
                placeholder: "Choisir une table"
              }
            ) }),
            /* @__PURE__ */ jsx(SelectContent, { id: "table", children: tables.map((table) => {
              var _a2;
              return /* @__PURE__ */ jsxs(
                SelectItem,
                {
                  value: ((_a2 = table.id) == null ? void 0 : _a2.toString()) || "0",
                  children: [
                    table.name,
                    " - ",
                    table.seats,
                    " place(s)"
                  ]
                },
                table.id
              );
            }) })
          ]
        }
      )
    }
  ) : /* @__PURE__ */ jsx("small", { children: "Aucune table disponible." }) });
};
const __vite_glob_0_58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TableInput
}, Symbol.toStringTag, { value: "Module" }));
const Index$1 = ({
  before_today,
  disabledDays,
  id,
  restaurant
}) => {
  const reservation_date = useRef(null);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [transformedServices, setTransformedServices] = useState([]);
  const [tables, setTables] = useState([]);
  const { data: data2, setData, reset, post, processing, errors, setError } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    reservation_date: null,
    time: "",
    table_id: void 0,
    service_id: void 0,
    guests: 1,
    id
  });
  const [goNext, setGoNext] = useState(false);
  const timeState = useDatePickerState({ granularity: "minute" });
  const {
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    steps,
    next
  } = useMultistepForm([
    /* @__PURE__ */ jsx(
      DateInput,
      {
        data: data2,
        setData,
        errors,
        setGoNext,
        before_today,
        reservation_date,
        disabledDays
      }
    ),
    /* @__PURE__ */ jsx(
      TimeAndGuestSelector,
      {
        timeState,
        loading,
        data: data2,
        setData,
        errors,
        services,
        transformedServices
      }
    ),
    /* @__PURE__ */ jsx(
      TableInput,
      {
        data: data2,
        setData,
        errors,
        tables,
        setGoNext
      }
    ),
    /* @__PURE__ */ jsx(UserInputs, { data: data2, setData, errors }),
    /* @__PURE__ */ jsx(Success, {})
  ]);
  function onSubmit(e) {
    if (e)
      e.preventDefault();
    let isoDate = null;
    if (data2.reservation_date) {
      isoDate = formatDateToIsoMidDay({ date: data2.reservation_date });
    }
    if (currentStepIndex + 1 === 1) {
      setLoading(true);
      setError("reservation_date", "");
      axios.post(route("reservation.step-one"), {
        reservation_date: isoDate,
        id: data2.id
      }).then((response) => {
        setServices(response.data.data.services);
        setTransformedServices(
          response.data.data.transformedServices
        );
        return next();
      }).catch((error) => {
        setError(error.response.data.errors);
        if (error.response.status === 403) {
          toast.error("Le restaurant ne peut pas accepter de réservation pour le moment.");
        }
        return back();
      }).finally(() => {
        setLoading(false);
      });
    }
    if (currentStepIndex + 1 === 2) {
      if (transformedServices && transformedServices.length === 0) {
        toast.error("Aucun service disponible pour cette date");
        return;
      }
      setError("time", "");
      const servicesIds = services.map((service) => service.id);
      axios.post(route("reservation.step-two", { restaurant: restaurant.id }), {
        time: data2.time,
        id: data2.id,
        services: servicesIds,
        guests: data2.guests,
        reservation_date: isoDate
      }).then((response) => {
        setTables(response.data.data.tables);
        setData("service_id", response.data.data.matchingService.id);
        if (response.data.data.tables.length === 0) {
          toast.error("Aucune table disponible pour cette date");
        }
        next();
      }).catch((error) => {
        setError(error.response.data.errors);
        if (error.response.status === 403) {
          toast.error("Le restaurant ne peut pas accepter de réservation pour le moment.");
        }
      }).finally(() => {
        setLoading(false);
      });
    }
    if (currentStepIndex + 1 === 3) {
      axios.post(route("reservation.step-three", { restaurant: restaurant.id }), {
        table_id: data2.table_id
      }).then((response) => {
        next();
      }).catch((error) => {
        setError(error.response.data.errors);
        if (error.response.status === 403) {
          toast.error("Le restaurant ne peut pas accepter de réservation pour le moment.");
        }
      }).finally(() => {
        setLoading(false);
      });
    }
    if (currentStepIndex + 1 === 4) {
      setLoading(true);
      axios.post(route("reservation.step-four", { restaurant: restaurant.id }), {
        table_id: data2.table_id,
        reservation_date: isoDate,
        first_name: data2.first_name,
        last_name: data2.last_name,
        email: data2.email,
        time: data2.time,
        guests: data2.guests,
        service_id: data2.service_id
      }).then((response) => {
        next();
      }).catch((error) => {
        setError(error.response.data.errors);
        if (error.response.status === 403) {
          toast.error("Le restaurant ne peut pas accepter de réservation pour le moment.");
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }
  useEffect(() => {
    if (goNext && !isLastStep) {
      onSubmit();
      setGoNext(false);
    }
  }, [goNext]);
  useEffect(() => {
    if (currentStepIndex === 2) {
      setData("table_id", void 0);
    }
  }, [currentStepIndex]);
  const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
  const contactModalSetRestaurant = useContactRestaurantModal.use.setRestaurant();
  return /* @__PURE__ */ jsxs(
    ResaLayout,
    {
      title: !isLastStep ? "📆 Réservez votre table" : /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2 justify-center", children: [
        /* @__PURE__ */ jsx(PartySvg, { className: "-translate-y-1 w-8 h-8" }),
        " ",
        /* @__PURE__ */ jsx("h2", { className: "", children: "Bravo !" }),
        " ",
        /* @__PURE__ */ jsx(PartySvg, { className: "-translate-y-1 w-8 h-8" })
      ] }),
      name: !isLastStep ? restaurant.name : "Votre réservation est prise en compte",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Réservation" }),
        /* @__PURE__ */ jsx("form", { onSubmit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          step,
          !isLastStep && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5 gap-2", children: [
            !isFirstStep ? /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: back,
                className: "w-full col-span-2",
                children: "Retour"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "col-span-2 w-full" }),
            currentStepIndex === 1 && transformedServices && transformedServices.length === 0 || currentStepIndex === 2 && tables && tables.length === 0 && restaurant.accept_messages ? /* @__PURE__ */ jsx(
              Button,
              {
                variant: "primaryBlue",
                className: "w-full col-span-3 text-white",
                type: "button",
                onClick: () => {
                  contactModalOnOpen();
                  contactModalSetRestaurant(restaurant);
                },
                children: "Contacter le restaurant"
              }
            ) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("small", { className: "text-center self-center", children: [
                currentStepIndex + 1,
                " / ",
                steps.length
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  variant: "outline",
                  className: "w-full col-span-2",
                  disabled: processing || transformedServices && transformedServices.length === 0 || currentStepIndex + 1 === 3 || loading,
                  children: currentStepIndex === 3 ? "Confirmer" : "Suivant"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
};
const UserInputs = ({
  data: data2,
  setData,
  errors
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "first_name",
          label: "Prénom",
          error: errors.first_name,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "first-name",
              value: data2.first_name,
              onChange: (e) => setData("first_name", e.target.value),
              placeholder: "Max"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormFieldLayout,
        {
          fieldName: "last_name",
          label: "Nom",
          error: errors.last_name,
          children: /* @__PURE__ */ jsx(
            Input,
            {
              id: "last-name",
              value: data2.last_name,
              onChange: (e) => setData("last_name", e.target.value),
              placeholder: "Robinson"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      FormFieldLayout,
      {
        fieldName: "email",
        label: "Prénom",
        error: errors.email,
        children: /* @__PURE__ */ jsx(
          Input,
          {
            value: data2.email,
            onChange: (e) => setData("email", e.target.value),
            id: "email",
            type: "email",
            placeholder: "m@example.com"
          }
        )
      }
    )
  ] });
};
const Success = () => {
  return /* @__PURE__ */ jsx("div", { className: "space-y-4" });
};
const __vite_glob_0_57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const RestaurantCanNotAcceptReservation = (props) => {
  const { restaurant } = props;
  const resto = restaurant.data;
  const contactModalOnOpen = useContactRestaurantModal.use.onOpen();
  const contactModalSetRestaurant = useContactRestaurantModal.use.setRestaurant();
  return /* @__PURE__ */ jsxs(
    ResaLayout,
    {
      title: /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2 justify-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "", children: "Oups !" }),
        " "
      ] }),
      name: "Le restaurant ne peut pas accepter de réservation pour le moment.",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Réservation impossible" }),
        /* @__PURE__ */ jsxs("div", { className: "w-full text-center", children: [
          /* @__PURE__ */ jsx("small", { className: "mb-4", children: "Veuillez contacter le restaurant pour plus d'informations." }),
          resto.accept_messages ? /* @__PURE__ */ jsx(
            Button,
            {
              variant: "primaryBlue",
              className: "w-full col-span-3 text-white",
              type: "button",
              onClick: () => {
                contactModalOnOpen();
                contactModalSetRestaurant(resto);
              },
              children: "Contacter"
            }
          ) : /* @__PURE__ */ jsx(Fragment, {})
        ] })
      ]
    }
  );
};
const __vite_glob_0_60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RestaurantCanNotAcceptReservation
}, Symbol.toStringTag, { value: "Module" }));
function Example() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("main", { className: "grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-primaryBlue", children: "404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl", children: "Restaurant introuvable." }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-base leading-7 text-muted-foreground", children: "Désolé, le restaurant que vous cherchez n'est pas disponible ou n'existe pas. Veuillez réessayer plus tard." })
  ] }) }) });
}
const __vite_glob_0_61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Example
}, Symbol.toStringTag, { value: "Module" }));
const RestaurantPageLayout = (props) => {
  const { children } = props;
  return /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx("div", { className: "bg-secondary", children }) }) });
};
const RestaurantPage = (props) => {
  const { restaurant, hours, avis } = props;
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: restaurant.data.name }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "descripton",
          content: `Bienvenue au restaurant ${restaurant.data.name}.`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(PageContent, { restaurant: restaurant.data, hours, avis })
  ] });
};
RestaurantPage.layout = (page) => {
  return /* @__PURE__ */ jsx(RestaurantPageLayout, { children: page });
};
const __vite_glob_0_71 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RestaurantPage
}, Symbol.toStringTag, { value: "Module" }));
const CreateRestaurant = () => {
  const onOpen = useRestaurantModal.use.onOpen();
  const isOpen = useRestaurantModal.use.isOpen();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(ModalProvider, {}) }) });
};
const __vite_glob_0_72 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateRestaurant
}, Symbol.toStringTag, { value: "Module" }));
const HeaderSection = ({ header, classNames: classNames2 }) => {
  return /* @__PURE__ */ jsx("header", { className: cn(classNames2), children: header });
};
const Create = ({
  stripeKey,
  intent,
  product,
  recurrence
}) => {
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stripeInstance = window.Stripe(stripeKey);
    setStripe(stripeInstance);
    setLoading(false);
  }, [stripeKey]);
  useEffect(() => {
    if (stripe) {
      setLoading(true);
      const clientSecret = intent.client_secret;
      const elementsInstance = stripe.elements({ clientSecret });
      setElements(elementsInstance);
      const paymentElementOptions = {
        layout: "tabs"
      };
      const paymentElement = elementsInstance.create(
        "payment",
        paymentElementOptions
      );
      paymentElement.mount("#payment-element");
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [stripe]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:8000/dashboard"
      },
      redirect: "if_required"
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else {
      let newData = {
        paymentMethod: setupIntent.payment_method,
        selectedProductId: product.id,
        recurrence
      };
      try {
        const response = await axios.post(
          route("subscribe.store"),
          newData
        );
        if (response.data.stripe_status === "active") {
          toast.success("Votre abonnement a été pris en compte");
          window.location.href = "/dashboard";
        }
      } catch (error2) {
        console.error(error2);
      } finally {
        setLoading(false);
      }
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs("form", { id: "payment-form", onSubmit, children: [
    /* @__PURE__ */ jsx("div", { id: "payment-element" }),
    /* @__PURE__ */ jsx(
      Button,
      {
        disabled: loading,
        className: "w-full my-6",
        id: "card-button",
        children: loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "w-6 h-6 animate animate-spin" }) : /* @__PURE__ */ jsx("span", { id: "button-text", children: "Je m'abonne" })
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "payment-message", className: "hidden" })
  ] }) });
};
function PaiementLayout({
  user,
  header,
  children
}) {
  return /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx(StripeLoader, {}),
    /* @__PURE__ */ jsx("main", { children })
  ] }) });
}
const Subscribe = (props) => {
  const { product, recurrence, price, products } = props;
  const rec = recurrence === "monthly" ? "mois" : "an";
  return /* @__PURE__ */ jsxs(PaiementLayout, { user: props.auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Abonnement" }),
    /* @__PURE__ */ jsx(HeaderSection, { header: "Abonnement" }),
    /* @__PURE__ */ jsx("div", { className: "md:max-w-4xl md:mx-auto min-h-screen w-full flex justify-center items-center", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: "\n             md:flex w-full gap-4",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full md:w-[45%] py-4 px-3 flex items-center flex-col justify-center rounded-xl", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl", children: "Votre choix" }),
            /* @__PURE__ */ jsx("h2", { className: "font-semibold text-md", children: product.name }),
            /* @__PURE__ */ jsxs("p", { className: "tracking-wide", children: [
              "Récurrence: ",
              price,
              "€ /",
              rec
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:w-[55%] rounded-xl min-h-[280px] md:min-h-[320px] bg-background/60 shadow w-full border px-6 py-4  flex  justify-center items-center", children: /* @__PURE__ */ jsx(
            Create,
            {
              stripeKey: props.stripeKey,
              intent: props.intent,
              product,
              recurrence
            }
          ) })
        ]
      }
    ) })
  ] });
};
const __vite_glob_0_73 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Subscribe
}, Symbol.toStringTag, { value: "Module" }));
const createSelectors$2 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useAuthModal = createSelectors$2(create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  tab: "login",
  setTab: (tab) => set({ tab })
})));
const RegisterButton = (props) => {
  const { className } = props;
  const authModalSetTab = useAuthModal.use.setTab();
  const authModalOnOpen = useAuthModal.use.onOpen();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      onClick: () => {
        authModalSetTab("register");
        authModalOnOpen();
      },
      variant: "default",
      className: cn("px-5 rounded-full text-muted/90 bg-neutral-800", className),
      type: "button",
      children: [
        /* @__PURE__ */ jsx("span", { children: "Inscription" }),
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
      ]
    }
  );
};
const GoProfileButton = (props) => {
  const { className } = props;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      onClick: () => {
        router.visit(route("profile.edit"));
      },
      variant: "default",
      className: cn("px-5 rounded-full text-muted/90 bg-neutral-800", className),
      type: "button",
      children: [
        /* @__PURE__ */ jsx("span", { children: "Mon profil" }),
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
      ]
    }
  );
};
const MobileNav = (props) => {
  const { tabs, sectionRefs, setActiveTab, activeTab, handleTabClick } = props;
  const user = useUser.use.user();
  const [mobileNav, toggleMobileNav] = useCycle(false, true);
  const buttonTransitionDuration = 0.5;
  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileNav]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "md:hidden z-[500] absolute top-2 w-full", children: /* @__PURE__ */ jsx("div", { className: "flex justify-end pr-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(AnimatePresence, { children: !mobileNav && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: {
            duration: buttonTransitionDuration
          },
          children: !user ? /* @__PURE__ */ jsx(RegisterButton, {}) : /* @__PURE__ */ jsx(GoProfileButton, {})
        }
      ) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "rounded-full h-14 w-full transition-colors duration-1000",
            mobileNav ? "bg-welcomePrimary" : "bg-welcomeBackground/50"
          ),
          children: /* @__PURE__ */ jsxs(
            motion.button,
            {
              type: "button",
              animate: mobileNav ? "open" : "closed",
              onClick: () => toggleMobileNav(),
              className: "flex flex-col space-y-1 px-4 w-full h-full justify-center rounded-full",
              children: [
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    variants: {
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 5 }
                    },
                    className: cn(
                      "w-6 h-[1px]  block cursor-pointor",
                      !mobileNav ? "bg-black" : "bg-green-200"
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    variants: {
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    },
                    className: cn(
                      "w-6 h-[1px]  block",
                      !mobileNav ? "bg-black" : "bg-green-200"
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    variants: {
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -5 }
                    },
                    className: cn(
                      "w-6 h-[1px]  block",
                      !mobileNav ? "bg-black" : "bg-green-200"
                    )
                  }
                )
              ]
            }
          )
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileNav && /* @__PURE__ */ jsx(
      MotionConfig,
      {
        transition: {
          type: "spring",
          bounce: 0.1
        },
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: {
              hide: {
                x: "-100%",
                transition: {
                  type: "spring",
                  bounce: 0.1,
                  when: "afterChildren",
                  staggerChildren: 0.25
                }
              },
              show: {
                x: "0%",
                transition: {
                  type: "spring",
                  bounce: 0.1,
                  when: "beforeChildren",
                  staggerChildren: 0.25
                }
              }
            },
            initial: "hide",
            animate: "show",
            exit: "hide",
            className: "z-[51] fixed inset-0 bg-welcomeBackground p-6 flex flex-col justify-center space-y-10 lg:hidden",
            children: [
              /* @__PURE__ */ jsxs(
                motion.ul,
                {
                  variants: {
                    hide: {
                      y: "25%",
                      opacity: 0
                    },
                    show: {
                      y: "0%",
                      opacity: 1
                    }
                  },
                  className: "list-none space-y-6",
                  children: [
                    tabs.map((tab, index) => /* @__PURE__ */ jsx("li", { className: "relative", children: /* @__PURE__ */ jsxs(
                      "p",
                      {
                        onClick: () => {
                          handleTabClick(tab.id);
                          toggleMobileNav();
                        },
                        className: "text-5xl rounded-full transition px-3 py-2 font-normal text-green-850/40 outline-2 outline-welcomeBackground focus-visible:outline",
                        children: [
                          activeTab === tab.id && /* @__PURE__ */ jsx(
                            motion.span,
                            {
                              layoutId: "active-pill-mobile",
                              style: {
                                borderRadius: 9999
                              },
                              className: "bg-welcomePrimary/70 absolute inset-0"
                            }
                          ),
                          /* @__PURE__ */ jsx("span", { className: "relative z-10 mix-blend-darken", children: tab.label })
                        ]
                      }
                    ) }, index)),
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "#",
                        className: "text-5xl font-semibold text-white",
                        children: "Link #2"
                      }
                    ) }),
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: "#",
                        className: "text-5xl font-semibold text-white",
                        children: "Link #3"
                      }
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  variants: {
                    hide: {
                      y: "25%",
                      opacity: 0
                    },
                    show: {
                      y: "0%",
                      opacity: 1
                    }
                  },
                  className: "w-full h-px bg-white/30"
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.ul,
                {
                  variants: {
                    hide: {
                      y: "25%",
                      opacity: 0
                    },
                    show: {
                      y: "0%",
                      opacity: 1
                    }
                  },
                  className: "list-none flex justify-center gap-x-4",
                  children: [
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg w-8 h-8" }) }),
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg w-8 h-8" }) }),
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg w-8 h-8" }) })
                  ]
                }
              )
            ]
          },
          "mobile-nav"
        )
      }
    ) })
  ] });
};
const DesktopNav = (props) => {
  const { tabs, handleTabClick, activeTab, setActiveTab } = props;
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const user = useUser.use.user();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return /* @__PURE__ */ jsx(
    motion.nav,
    {
      variants: {
        visible: { y: 0 },
        hidden: { y: "-115%" }
      },
      animate: hidden ? "hidden" : "visible",
      transition: {
        duration: 0.35,
        ease: "easeInOut"
      },
      className: "fixed top-2 z-50 w-full",
      children: /* @__PURE__ */ jsxs("div", { className: "hidden h-14 w-full items-center justify-between rounded-full border border-welcomePrimary/70 bg-welcomeBackground/30 backdrop-blur-md md:mx-auto md:flex md:w-[770px] md:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center md:gap-6", children: [
          /* @__PURE__ */ jsx("p", { children: "Logo" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center md:gap-4", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
            "p",
            {
              onClick: () => handleTabClick(tab.id),
              className: cn(
                activeTab === tab.id ? "" : "hover:text-green-900/50",
                "relative cursor-pointer rounded-full px-3 py-2 text-sm font-normal text-neutral-800 outline-2 outline-welcomeBackground transition focus-visible:outline"
              ),
              children: [
                activeTab === tab.id && /* @__PURE__ */ jsx(
                  m.span,
                  {
                    layoutId: "active-pill",
                    style: { borderRadius: 9999 },
                    className: "absolute inset-0 bg-welcomePrimary/70"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "relative z-10 mix-blend-darken", children: tab.label })
              ]
            },
            tab.id
          )) })
        ] }),
        !user ? /* @__PURE__ */ jsx(RegisterButton, {}) : /* @__PURE__ */ jsx(GoProfileButton, {})
      ] })
    }
  );
};
const Index = (props) => {
  const { tabs, sectionRefs } = props;
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tabId = tabs[sectionRefs.current.indexOf(
              entry.target
            )].id;
            setActiveTab(tabId);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.1, 0.9]
        // Trigger when 10% of the section is visible
      }
    );
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [sectionRefs, tabs]);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const section = sectionRefs.current[tabs.findIndex((tab) => tab.id === tabId)];
    if (section) {
      const offset = 0.1 * window.innerHeight;
      window.scrollTo({
        top: section.offsetTop - offset,
        behavior: "auto"
        // Remove smooth scroll
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(DesktopNav, { tabs, sectionRefs, handleTabClick, activeTab, setActiveTab }),
    /* @__PURE__ */ jsx(MobileNav, { tabs, sectionRefs, handleTabClick, activeTab, setActiveTab })
  ] });
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const LandingCalendar = ({
  today,
  selectedDay,
  setSelectedDay,
  containerClassNames,
  todaySelectedClassNames = "bg-primaryBlue text-white"
}) => {
  let [currentMonth, setCurrentMonth] = useState(
    format(today, "MMMM-yyyy", { locale: fr })
  );
  let firstDayCurrentMonth = parse(currentMonth, "MMMM-yyyy", /* @__PURE__ */ new Date(), {
    locale: fr
  });
  let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, {
      weekStartsOn: 1,
      locale: fr
    }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), {
      weekStartsOn: 1,
      locale: fr
    })
  });
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy", { locale: fr }));
  }
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMMM-yyyy", { locale: fr }));
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("md:pr-14", containerClassNames), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "flex-auto text-sm font-semibold text-welcomePrimaryText capitalize", children: format(firstDayCurrentMonth, "MMMM yyyy", { locale: fr }) }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: previousMonth,
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "-my-1.5 flex flex-none items-center justify-center py-0.5 px-1.5 ",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous month" }),
            /* @__PURE__ */ jsx(
              ChevronLeftIcon,
              {
                className: "h-5 w-5 text-muted-foreground",
                "aria-hidden": "true"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: nextMonth,
          type: "button",
          size: "sm",
          variant: "ghost",
          className: "-my-1.5 flex flex-none items-center justify-center py-0.5 px-1.5",
          children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next month" }),
            /* @__PURE__ */ jsx(
              ChevronRightIcon$1,
              {
                className: "text-muted-foreground h-5 w-5",
                "aria-hidden": "true"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border mt-10 rounded-lg border-welcomePrimary overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-welcomeBackground/60 py-1   grid grid-cols-7 text-center text-xs leading-6 text-secondary-foreground", children: [
        /* @__PURE__ */ jsx("div", { children: "L" }),
        /* @__PURE__ */ jsx("div", { children: "Ma" }),
        /* @__PURE__ */ jsx("div", { children: "Mer" }),
        /* @__PURE__ */ jsx("div", { children: "J" }),
        /* @__PURE__ */ jsx("div", { children: "V" }),
        /* @__PURE__ */ jsx("div", { children: "S" }),
        /* @__PURE__ */ jsx("div", { children: "D" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 text-sm bg-white", children: newDays.map((day, dayIdx) => /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames(
            dayIdx > 6 && "",
            dayIdx === 0 && colStartClasses[getDay(day)],
            "py-2"
          ),
          children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: classNames(
                isEqual(day, selectedDay) && "text-secondary-foreground/80",
                !isEqual(day, selectedDay) && isToday(day) && "text-primaryBlue/80",
                !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(
                  day,
                  firstDayCurrentMonth
                ) && "text-foreground",
                !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(
                  day,
                  firstDayCurrentMonth
                ) && "text-muted-foreground/60",
                isEqual(day, selectedDay) && isToday(day) && todaySelectedClassNames,
                isEqual(day, selectedDay) && !isToday(day) && "bg-secondary",
                !isEqual(day, selectedDay) && "hover:bg-secondary",
                "mx-auto flex h-9 w-9 items-center justify-center rounded-full relative"
              ),
              children: /* @__PURE__ */ jsx("time", { dateTime: format(day, "dd-MM-yyyy"), children: format(day, "d", { locale: fr }) })
            }
          )
        },
        day.toString()
      )) })
    ] })
  ] });
};
let colStartClasses = [
  "col-start-7",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6"
];
const HeroHighlight = ({
  children,
  className,
  containerClassName
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY
  }) {
    if (!currentTarget)
      return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative h-[40rem] flex  items-center justify-center w-full group",
        containerClassName
      ),
      onMouseMove: handleMouseMove,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800  pointer-events-none" }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "pointer-events-none bg-dot-thick-green-500 dark:bg-dot-thick-indigo-500   absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100",
            style: {
              WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
              maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: cn("relative z-20", className), children })
      ]
    }
  );
};
const CalendarCard = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  return /* @__PURE__ */ jsx(
    m.div,
    {
      initial: {
        opacity: 0,
        x: -20
      },
      animate: {
        opacity: 1,
        x: [-20, 5, 0]
      },
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.4, 0, 0.2, 1]
      },
      className: "w-full",
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      },
      style: {
        transform: isHovering ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)` : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out"
      },
      children: /* @__PURE__ */ jsx(
        m.div,
        {
          style: {
            transform: isHovering ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)` : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out"
          },
          className: " border-welcomePrimary/20 w-full p-1 border-2 rounded-2xl",
          children: /* @__PURE__ */ jsx("div", { className: " border border-welcomePrimary p-4 rounded-xl bg-welcomeBackground/5", children: /* @__PURE__ */ jsx(HeroHighlight, { containerClassName: "h-fit block", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-5 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold  text-lg mt-10", children: "Réserver votre table" }),
              /* @__PURE__ */ jsx("small", { className: "py-3 inline-block italic", children: "Restaurant Le Superbe" }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-3 text-sm pb-3", children: [
                /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Calendar$2, { className: "w-5 h-5 fill-welcomeBackground/80" }) }),
                /* @__PURE__ */ jsx("span", { children: format(selectedDay, "dd MMMM yyyy", {
                  locale: fr
                }) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-3 text-sm pb-3", children: [
                /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5 fill-welcomeBackground/80" }) }),
                /* @__PURE__ */ jsx("span", { children: format(/* @__PURE__ */ new Date(), "HH:mm", {
                  locale: fr
                }) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-3 text-sm", children: [
                /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(User2, { className: "w-5 h-5 fill-welcomeBackground/80" }) }),
                /* @__PURE__ */ jsx("span", { children: "3 personnes" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-span-3", children: /* @__PURE__ */ jsx(
              LandingCalendar,
              {
                today,
                selectedDay,
                setSelectedDay,
                containerClassNames: "md:pr-0",
                todaySelectedClassNames: "bg-welcomePrimary/60 text-gray-100 font-normal"
              }
            ) })
          ] }) }) })
        }
      )
    }
  );
};
const Text = () => {
  const user = useUser.use.user();
  return /* @__PURE__ */ jsxs("div", { className: "px-4 max-w-2xl space-y-5 md:mt-0 mt-24", children: [
    /* @__PURE__ */ jsx(
      m.div,
      {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: [20, -5, 0]
        },
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        },
        className: "max-w-fit",
        children: /* @__PURE__ */ jsxs("div", { className: "relative rounded-full px-1 py-1 text-sm leading-2 text-foreground ring-[1px] ring-muted hover:ring-neutral-500 transition-all flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "uppercase text-white bg-neutral-900 py-1 rounded-full px-2 mr-1 text-xs", children: "NEW" }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: "/changelog",
              className: "flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Lancement de la v1 " }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      m.h1,
      {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: [20, -5, 0]
        },
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        },
        className: "header-welcome",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "text-shadow shadow-gray-400", children: [
            " ",
            "Modernisez votre restaurant avec notre outil innovant et",
            " "
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "relative w-fit inline-block", children: [
            /* @__PURE__ */ jsx("span", { className: "z-1 absolute  md:translate-x-[-2px] md:translate-y-[3px] translate-x-[-1px] translate-y-[2px] text-neutral-800", children: "complet !" }),
            /* @__PURE__ */ jsx("span", { className: "z-2 relative font-outline-2 text-white", children: "complet !" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      m.div,
      {
        initial: {
          opacity: 0,
          y: -60
        },
        animate: {
          opacity: 1,
          y: [-60, 10, 0]
        },
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: [0.4, 0, 0.2, 1]
        },
        className: "w-full flex-wrap",
        children: "Découvrez TrouveTaTable.fr notre plateforme pour restaurateurs. Concentrez-vous sur vos clients, pas sur la gestion."
      }
    ),
    /* @__PURE__ */ jsx(
      m.div,
      {
        initial: {
          opacity: 0,
          x: -30
        },
        animate: {
          opacity: 1,
          x: [-30, 10, -5, 0]
        },
        transition: {
          duration: 0.5,
          delay: 0.6,
          ease: [0.4, 0, 0.2, 1]
        },
        children: !user ? /* @__PURE__ */ jsx(RegisterButton, { className: " w-[210px] py-7" }) : /* @__PURE__ */ jsx(GoProfileButton, { className: " w-[210px] py-7" })
      }
    )
  ] });
};
const LandingHeader = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id: "Home",
      ref,
      ...props,
      className: "max-w-[1480px] mx-auto min-h-screen 3xl:min-h-fit 3xl:py-52 px-2 flex lg:flex-row flex-col space-y-10 md:space-y-0 items-center md:justify-between justify-center  md:px-8 lg:px-16 md:w-full",
      children: [
        /* @__PURE__ */ jsx(Text, {}),
        /* @__PURE__ */ jsx(CalendarCard, {})
      ]
    }
  );
});
const Calendar = ({ cursor2, cardRef2, mouseOnCard2, color }) => {
  const [gradientCenter2, setGradientCenter2] = useState({
    cx: "50%",
    cy: "50%"
  });
  useEffect(() => {
    if (cardRef2.current && cursor2.x !== null && cursor2.y !== null) {
      const cardRect = cardRef2.current.getBoundingClientRect();
      const cxPercentage2 = cursor2.x / cardRect.width * 100 - 24;
      const cyPercentage2 = cursor2.y / cardRect.height * 100;
      setGradientCenter2({
        cx: `${cxPercentage2}%`,
        cy: `${cyPercentage2}%`
      });
    }
  }, [cursor2, cardRef2]);
  useEffect(() => {
  }, [gradientCenter2]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "md:w-56 md:h-56 w-44 h-44 duration-200 transition-all",
      strokeWidth: "0.2",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "radialGradient",
          {
            id: "emeraldGradient2",
            gradientUnits: "userSpaceOnUse",
            r: "30%",
            cx: gradientCenter2.cx,
            cy: gradientCenter2.cy,
            children: [
              mouseOnCard2 && /* @__PURE__ */ jsx("stop", { stopColor: `${color}` }),
              /* @__PURE__ */ jsx("stop", { offset: 1, stopColor: "#404040" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "url(#emeraldGradient2)",
            className: "fill-neutral-950/70",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          }
        )
      ]
    }
  );
};
const CardBook = () => {
  const boldRef = useRef(null);
  const [cursor2, setCursor2] = useState({ x: 0, y: 0 });
  const [mouseOnCard2, setMouseOnCard2] = useState(false);
  const handleMouseMove2 = (e) => {
    if (boldRef.current !== null) {
      const rect2 = boldRef.current.getBoundingClientRect();
      const x2 = e.clientX - rect2.left;
      const y2 = e.clientY - rect2.top;
      setCursor2({ x: x2, y: y2 });
    }
  };
  const color = "#D87093";
  const list = [
    {
      title: "Réservations illimités"
    },
    {
      title: "Email de notification"
    },
    {
      title: "Gestion des réservations clients"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: boldRef,
      onMouseEnter: () => setMouseOnCard2(true),
      onMouseLeave: () => setMouseOnCard2(false),
      onMouseMove: (event) => handleMouseMove2(event),
      className: "md:w-[30rem] w-full h-fit bg-neutral-800 rounded-lg border border-neutral-600\r\n    flex flex-col md:flex-row p-8  stroke-[0.1] hover:stroke-[0.2]\r\n    ",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full md:w-3/5 justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
            /* @__PURE__ */ jsx(
              CalendarCheck,
              {
                className: "w-10 h-10 rounded-lg bg-neutral-950/70 p-2 shadow-inner",
                style: { stroke: color }
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-neutral-200 tracking-wide text-xl", children: "Réservation" }),
            /* @__PURE__ */ jsx("p", { className: "-mt-2 text-sm md:text-md text-neutral-500 tracking-wide", children: "Bénéficier d'un système de réservation intégré." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-col text-neutral-200 tracking-wide text-xs md:text-sm", children: list.map((item, index) => /* @__PURE__ */ jsxs("span", { className: "flex flex-row gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-5", style: { color } }),
            /* @__PURE__ */ jsx("p", { children: item.title })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-2/5 flex flex-col place-items-center", children: /* @__PURE__ */ jsx(
          Calendar,
          {
            mouseOnCard2,
            cursor2,
            cardRef2: boldRef,
            color
          }
        ) })
      ]
    }
  );
};
const Star = ({ cursor2, cardRef2, mouseOnCard2, color }) => {
  const [gradientCenter2, setGradientCenter2] = useState({
    cx: "50%",
    cy: "50%"
  });
  useEffect(() => {
    if (cardRef2.current && cursor2.x !== null && cursor2.y !== null) {
      const cardRect = cardRef2.current.getBoundingClientRect();
      const cxPercentage2 = cursor2.x / cardRect.width * 100 - 24;
      const cyPercentage2 = cursor2.y / cardRect.height * 100;
      setGradientCenter2({
        cx: `${cxPercentage2}%`,
        cy: `${cyPercentage2}%`
      });
    }
  }, [cursor2, cardRef2]);
  useEffect(() => {
  }, [gradientCenter2]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "md:w-56 md:h-56 w-44 h-44 duration-200 transition-all",
      strokeWidth: "0.2",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "radialGradient",
          {
            id: "emeraldGradient1",
            gradientUnits: "userSpaceOnUse",
            r: "30%",
            cx: gradientCenter2.cx,
            cy: gradientCenter2.cy,
            children: [
              mouseOnCard2 && /* @__PURE__ */ jsx("stop", { stopColor: color }),
              /* @__PURE__ */ jsx("stop", { offset: 1, stopColor: "#404040" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            stroke: "url(#emeraldGradient1)",
            className: "fill-neutral-950/70",
            d: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          }
        )
      ]
    }
  );
};
const CardRating = () => {
  const boldRef = useRef(null);
  const [cursor2, setCursor2] = useState({ x: 0, y: 0 });
  const [mouseOnCard2, setMouseOnCard2] = useState(false);
  const handleMouseMove2 = (e) => {
    if (boldRef.current !== null) {
      const rect2 = boldRef.current.getBoundingClientRect();
      const x2 = e.clientX - rect2.left;
      const y2 = e.clientY - rect2.top;
      setCursor2({ x: x2, y: y2 });
    }
  };
  const color = "#f9a825";
  const list = [
    {
      title: "Notations et avis clients"
    },
    {
      title: "Modération et contrôle sur les avis clients"
    },
    {
      title: "Avis vérifiés"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: boldRef,
      onMouseEnter: () => setMouseOnCard2(true),
      onMouseLeave: () => setMouseOnCard2(false),
      onMouseMove: (event) => handleMouseMove2(event),
      className: "md:w-[30rem] w-full h-fit bg-neutral-800 rounded-lg border border-neutral-600\r\n    flex flex-col md:flex-row p-8  stroke-[0.1] hover:stroke-[0.2]\r\n    ",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full md:w-3/5 justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
            /* @__PURE__ */ jsx(
              StarIcon,
              {
                className: "w-10 h-10 rounded-lg bg-neutral-950/70  p-2 shadow-inner",
                style: { stroke: color }
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-neutral-200 tracking-wide text-xl", children: "Avis client" }),
            /* @__PURE__ */ jsx("p", { className: "-mt-2 text-sm md:text-md text-neutral-500 tracking-wide", children: "Système d'avis et de notation client. Tous les avis sont vérifiés." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-col text-neutral-200 tracking-wide text-xs md:text-sm", children: list.map((item, index) => /* @__PURE__ */ jsxs("span", { className: "flex flex-row gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-5", style: { color } }),
            /* @__PURE__ */ jsx("p", { children: item.title })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-2/5 flex flex-col place-items-center", children: /* @__PURE__ */ jsx(
          Star,
          {
            mouseOnCard2,
            cursor2,
            cardRef2: boldRef,
            color
          }
        ) })
      ]
    }
  );
};
const StoreFront = ({ cursor2, cardRef2, mouseOnCard2, color }) => {
  const [gradientCenter2, setGradientCenter2] = useState({
    cx: "50%",
    cy: "50%"
  });
  useEffect(() => {
    if (cardRef2.current && cursor2.x !== null && cursor2.y !== null) {
      const cardRect = cardRef2.current.getBoundingClientRect();
      const cxPercentage2 = cursor2.x / cardRect.width * 100 - 24;
      const cyPercentage2 = cursor2.y / cardRect.height * 100;
      setGradientCenter2({
        cx: `${cxPercentage2}%`,
        cy: `${cyPercentage2}%`
      });
    }
  }, [cursor2, cardRef2]);
  useEffect(() => {
  }, [gradientCenter2]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className: "md:w-56 md:h-56 w-44 h-44 duration-200 transition-all",
      strokeWidth: "0.2",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
          "radialGradient",
          {
            id: "emeraldGradient3",
            gradientUnits: "userSpaceOnUse",
            r: "30%",
            cx: gradientCenter2.cx,
            cy: gradientCenter2.cy,
            children: [
              mouseOnCard2 && /* @__PURE__ */ jsx("stop", { stopColor: color }),
              /* @__PURE__ */ jsx("stop", { offset: 1, stopColor: "#404040" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            stroke: "url(#emeraldGradient3)",
            className: "fill-neutral-950/70",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72l1.189-1.19A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z"
          }
        )
      ]
    }
  );
};
const CardStoreFront = () => {
  const boldRef = useRef(null);
  const [cursor2, setCursor2] = useState({ x: 0, y: 0 });
  const [mouseOnCard2, setMouseOnCard2] = useState(false);
  const handleMouseMove2 = (e) => {
    if (boldRef.current !== null) {
      const rect2 = boldRef.current.getBoundingClientRect();
      const x2 = e.clientX - rect2.left;
      const y2 = e.clientY - rect2.top;
      setCursor2({ x: x2, y: y2 });
    }
  };
  const color = "#4682B4";
  const list = [
    {
      title: "URL unique pouvant être partagée"
    },
    {
      title: "Optimisation SEO"
    },
    {
      title: "Intégration de Google Analytic"
    }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: boldRef,
      onMouseEnter: () => setMouseOnCard2(true),
      onMouseLeave: () => setMouseOnCard2(false),
      onMouseMove: (event) => handleMouseMove2(event),
      className: "md:w-[30rem] w-full h-fit bg-neutral-800 rounded-lg border border-neutral-600\r\n    flex md:flex-row flex-col p-8  stroke-[0.1] hover:stroke-[0.2]\r\n    ",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full md:w-3/5 justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
            /* @__PURE__ */ jsx(
              ChartBarIcon,
              {
                className: "w-10 h-10 rounded-lg bg-neutral-950/70  p-2 shadow-inner",
                style: { stroke: color }
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-neutral-200 tracking-wide text-xl", children: "Vitrine" }),
            /* @__PURE__ */ jsx("p", { className: "-mt-2 text-sm md:text-md text-neutral-500 tracking-wide", children: "Boostez votre présence en ligne grâce à une page vitrine dediée à votre établissement." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-col text-neutral-200 tracking-wide text-xs md:text-sm", children: list.map((item, index) => /* @__PURE__ */ jsxs("span", { className: "flex flex-row gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-5", style: { color } }),
            /* @__PURE__ */ jsx("p", { children: item.title })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full md:w-2/5 flex flex-col place-items-center", children: /* @__PURE__ */ jsx(
          StoreFront,
          {
            mouseOnCard2,
            cursor2,
            cardRef2: boldRef,
            color
          }
        ) })
      ]
    }
  );
};
const Features = forwardRef((props, ref) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    }
  };
  const childrenX = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 }
  };
  const childrenY = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0 }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", id: "Features", ref, ...props, children: [
    /* @__PURE__ */ jsx("div", { className: "min-h-fit bg-neutral-900 px-4 py-10 md:py-36 md:px-0 lg:h-fit", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col justify-center space-y-4 px-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "header-welcome mb-5 text-2xl font-bold text-welcomeBackground/90 md:text-5xl", children: "Nos avantages" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "items-center justify-center gap-4 space-y-4 md:flex md:space-y-0", children: [
          /* @__PURE__ */ jsx(
            m.div,
            {
              initial: {
                opacity: 0,
                y: 20
              },
              whileInView: {
                opacity: 1,
                y: [20, -5, 0]
              },
              transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              },
              children: /* @__PURE__ */ jsx(CardBook, {})
            }
          ),
          /* @__PURE__ */ jsx(
            m.div,
            {
              initial: {
                opacity: 0,
                y: 20
              },
              whileInView: {
                opacity: 1,
                y: [20, -5, 0]
              },
              transition: {
                duration: 0.5,
                delay: 0.2,
                ease: [0.4, 0, 0.2, 1]
              },
              children: /* @__PURE__ */ jsx(CardRating, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "items-center justify-center md:flex", children: /* @__PURE__ */ jsx(
          m.div,
          {
            initial: {
              opacity: 0,
              y: 20
            },
            whileInView: {
              opacity: 1,
              y: [20, -5, 0]
            },
            transition: {
              duration: 0.5,
              delay: 0.4,
              ease: [0.4, 0, 0.2, 1]
            },
            children: /* @__PURE__ */ jsx(CardStoreFront, {})
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex py-10 md:py-36 max-w-7xl flex-1 flex-col justify-center px-4 md:px-0 ", children: [
      /* @__PURE__ */ jsx("h3", { className: "header-welcome tracking-tight text-center mb-10 mt-6 text-2xl font-bold text-neutral-800 md:mt-0  md:text-5xl", children: "Est-ce que ce service est fait pour moi ?" }),
      /* @__PURE__ */ jsx("div", { className: "items-center justify-center p-4 md:max-w-4xl mx-auto", children: /* @__PURE__ */ jsx("div", { className: "items-center justify-between md:flex", children: /* @__PURE__ */ jsxs(
        m.div,
        {
          variants: container,
          initial: "hidden",
          whileInView: "show",
          className: "gap-5 space-y-5 md:grid md:grid-cols-2 md:space-y-0",
          children: [
            /* @__PURE__ */ jsx(
              m.div,
              {
                variants: childrenX,
                transition: {
                  duration: 0.9,
                  type: "spring"
                },
                children: /* @__PURE__ */ jsx(Card, { className: "h-full bg-[#D87093]/5 py-5", children: /* @__PURE__ */ jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#D87093]", children: "Vous dirigez un restaurant" }),
                  " ",
                  "et cherchez à automatiser la confirmation des réservations et les rappels par email pour éviter les no-shows."
                ] }) })
              }
            ),
            /* @__PURE__ */ jsx(
              m.div,
              {
                variants: childrenY,
                transition: {
                  duration: 0.9,
                  type: "spring"
                },
                children: /* @__PURE__ */ jsx(Card, { className: "h-full bg-welcomeBackground/40 py-5", children: /* @__PURE__ */ jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold text-green-950", children: "Vous êtes restaurateur / gérant d'un restaurant" }),
                  " ",
                  "avez besoin d'une présence en ligne plus forte pour attirer plus de visiteurs."
                ] }) })
              }
            ),
            /* @__PURE__ */ jsx(
              m.div,
              {
                variants: childrenX,
                transition: {
                  duration: 0.9,
                  type: "spring"
                },
                children: /* @__PURE__ */ jsx(Card, { className: "h-full bg-[#4682B4]/20 py-5", children: /* @__PURE__ */ jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#4682B4]", children: [
                    "Vous avez un restaurant",
                    " "
                  ] }),
                  " ",
                  "et vous avez besoin d'un système de réservation performant et intuitif."
                ] }) })
              }
            ),
            /* @__PURE__ */ jsx(
              m.div,
              {
                variants: childrenY,
                transition: {
                  duration: 0.9,
                  type: "spring"
                },
                children: /* @__PURE__ */ jsx(Card, { className: "h-full bg-[#f9a825]/15 py-5", children: /* @__PURE__ */ jsxs(CardContent, { children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#f9a825]", children: [
                    "Votre restaurant",
                    " "
                  ] }),
                  " ",
                  "veut optimiser les réservations et faciliter la communication avec les clients grâce à un formulaire de contact."
                ] }) })
              }
            )
          ]
        }
      ) }) })
    ] })
  ] });
});
const createSelectors$1 = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useSubscriptionModal = createSelectors$1(
  create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    product: {},
    setProduct: (product) => set({ product }),
    recurrence: "monthly",
    setRecurrence: (recurrence) => set({ recurrence })
  }))
);
const SubscriptionModal = () => {
  const contactModalOnClose = useSubscriptionModal.use.onClose();
  const contactModalIsOpen = useSubscriptionModal.use.isOpen();
  const contactModalProduct = useSubscriptionModal.use.product();
  const contactModalRecurrence = useSubscriptionModal.use.recurrence();
  const [stripeKey, setStripeKey] = useState("");
  const [intent, setIntent] = useState();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          route("subscribe.modal.create", {
            product: contactModalProduct,
            recurrence: contactModalRecurrence
          })
        );
        setStripeKey(response.data.data.stripeKey);
        setIntent(response.data.data.intent);
        setProduct(response.data.data.product);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (contactModalIsOpen && contactModalProduct && contactModalRecurrence) {
      fetchData();
    }
  }, [contactModalIsOpen, contactModalProduct, contactModalRecurrence]);
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      dialogTitleClasses: "text-xl text-primary/80",
      title: (product == null ? void 0 : product.name) ?? "Abonnement",
      isOpen: contactModalIsOpen,
      onClose: contactModalOnClose,
      dialogContentClasses: "bg-secondary md:max-w-md md:px-8",
      children: [
        /* @__PURE__ */ jsx(StripeLoader, {}),
        isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-24", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "animate-spin h-8 w-8 text-primary",
            viewBox: "0 0 24 24",
            children: [
              /* @__PURE__ */ jsx(
                "circle",
                {
                  className: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  strokeWidth: "4"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8v-4a4 4 0 00-4-4 4 4 0 00-4 4v4a8 8 0 00-4 6 1 1 0 11-2 0 10 10 0 012-6zm2 6a2 2 0 114 0 2 2 0 01-4 0z"
                }
              )
            ]
          }
        ) }) : /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            (product == null ? void 0 : product.formatPrices[contactModalRecurrence]) && contactModalRecurrence === "annually" ? transformMonthPriceToYearPrice(
              product == null ? void 0 : product.formatPrices[contactModalRecurrence]
            ) : product == null ? void 0 : product.formatPrices[contactModalRecurrence],
            " ",
            "€"
          ] }),
          /* @__PURE__ */ jsx(
            Create,
            {
              stripeKey,
              intent,
              product: contactModalProduct,
              recurrence: contactModalRecurrence
            }
          )
        ] })
      ]
    }
  );
};
const SubscriptionModalButton = (props) => {
  const { product, frequency = "monthly" } = props;
  const contactModalOnOpen = useSubscriptionModal.use.onOpen();
  const contactModalSetProduct = useSubscriptionModal.use.setProduct();
  const contactModalSetRecurrence = useSubscriptionModal.use.setRecurrence();
  const user = useUser.use.user();
  const authModalOnOpen = useAuthModal.use.onOpen();
  const onClick = () => {
    if (!user) {
      authModalOnOpen();
      toast.error("Vous devez être connecté pour continuer");
      return;
    }
    if (user.isFondator) {
      toast.error("Vous êtes déjà abonné");
      return;
    }
    contactModalOnOpen();
    contactModalSetProduct(product);
    contactModalSetRecurrence(frequency);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        size: "lg",
        onClick: () => {
          onClick();
        },
        className: "bg-welcomeBackground text-green-900 hover:bg-welcomeBackground/80",
        children: [
          /* @__PURE__ */ jsx("span", { children: "J'en profite" }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 " }) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(SubscriptionModal, {})
  ] });
};
const ProductCard = (props) => {
  const { products, frequency } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        products.mostPopular ? "z-10 bg-secondary shadow-xl ring-1 ring-green-900/10" : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
        "relative rounded-2xl border border-welcomePrimary md:col-start-2"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "p-8 lg:pt-12 xl:p-10 xl:pt-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              id: products.id,
              className: cn(
                products.mostPopular ? "text-gray-900" : "text-white",
                "text-sm font-semibold leading-6"
              ),
              children: products.name
            }
          ),
          products.mostPopular ? /* @__PURE__ */ jsx("p", { className: "rounded-full bg-welcomeBackground px-3.5 py-2 text-xs font-semibold leading-5 text-green-900", children: "Spécial Lancement" }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-x-4", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  products.mostPopular ? "text-gray-900" : "text-white",
                  "text-4xl font-bold tracking-tight"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    PricingContent,
                    {
                      tier: products,
                      frequency
                    }
                  ),
                  " "
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "text-sm leading-5", children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: products.mostPopular ? "text-gray-900" : "text-white",
                  children: "EUR"
                }
              ),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  className: cn(
                    products.mostPopular ? "text-gray-500" : "text-gray-400",
                    "capitalize"
                  ),
                  children: [
                    `Abonnement `,
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "lowercase", children: frequency.label })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(ButtonLink, { tier: products, frequency })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 flow-root sm:mt-10", children: /* @__PURE__ */ jsx(
          "ul",
          {
            role: "list",
            className: cn(
              products.mostPopular ? "divide-gray-900/5 border-gray-900/5 text-gray-600" : "divide-white/5 border-white/5 text-white",
              "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
            ),
            children: JSON.parse(products.feature).map(
              (f, index) => /* @__PURE__ */ jsxs("li", { className: "flex gap-x-3 py-2", children: [
                /* @__PURE__ */ jsx(
                  CheckIcon,
                  {
                    className: cn(
                      products.mostPopular ? "text-welcomePrimary" : "text-gray-500",
                      "h-6 w-5 flex-none"
                    ),
                    "aria-hidden": "true"
                  }
                ),
                f
              ] }, index)
            )
          }
        ) })
      ] })
    }
  );
};
function PricingContent({ tier, frequency }) {
  var _a;
  if (!tier || !frequency) {
    return null;
  }
  const price = ((_a = JSON.parse(tier.price)) == null ? void 0 : _a[frequency.value]) ?? 0;
  const isContactLink = price === -1;
  const priceText = isContactLink ? null : `${formatPriceFromCents(price, false)} €`;
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: priceText && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "text-4xl font-bold tracking-tight text-gray-900", children: priceText }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold leading-6 text-gray-600", children: frequency.priceSuffix })
  ] }) });
}
const ButtonLink = ({ tier, frequency }) => {
  if (!tier || !frequency) {
    return null;
  }
  `/subscribe/${tier.id}?recurrence=${frequency.value}`;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    SubscriptionModalButton,
    {
      product: tier,
      frequency: frequency.value
    }
  ) });
};
const SlideTabs = ({ activeFrequency, setActiveFrequency, frequencies: frequencies2 }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0
  });
  return /* @__PURE__ */ jsx("ul", { className: "cursor-pointer bg-white/5 rounded-full p-1 text-center text-xs font-semibold leading-5 text-muted", children: /* @__PURE__ */ jsxs("div", { className: "relative grid grid-cols-2 gap-x-1", children: [
    frequencies2.map((option) => /* @__PURE__ */ jsx(
      Tab,
      {
        setPosition,
        isActive: activeFrequency.value === option.value,
        onClick: () => setActiveFrequency(option),
        children: option.label
      },
      option.value
    )),
    /* @__PURE__ */ jsx(Cursor, { position })
  ] }) });
};
const Tab = ({ children, setPosition, isActive, onClick }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (isActive && ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setPosition({
        left: ref.current.offsetLeft,
        width,
        opacity: 1
      });
    }
  }, [isActive, setPosition]);
  return /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      onClick,
      className: `relative cursor-pointer rounded-full px-2.5 py-1 text-white`,
      children: /* @__PURE__ */ jsx("span", { className: "relative mix-blend-exclusion", children })
    }
  );
};
const Cursor = ({ position }) => {
  return /* @__PURE__ */ jsx(
    m.li,
    {
      animate: {
        ...position
      },
      style: { borderRadius: 9999 },
      transition: {
        ease: "easeInOut"
      },
      className: "bg-welcomeBackground z-[-1] absolute inset-0"
    }
  );
};
const frequencies = [
  { value: "monthly", label: "Mensuel", priceSuffix: "/mois" },
  { value: "annually", label: "Annuel", priceSuffix: "/mois" }
];
const StarterPrice = forwardRef(
  ({ products, ...props }, ref) => {
    const [frequency, setFrequency] = useState(frequencies[0]);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        ...props,
        id: "Price",
        className: "isolate overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flow-root bg-neutral-900 pb-16 pt-24 sm:pt-32 lg:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("h2", { className: "mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white", children: "Prix spécial de lancement." }),
              /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60", children: "Un prix unique, tout inclus, tout illimité. Pas de frais cachés. Pas de surprises. Vous avez accès à toutes les fonctionnalités actuelles et à futures de notre plateforme." }),
              /* @__PURE__ */ jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsx("fieldset", { "aria-label": "Payment frequency", children: /* @__PURE__ */ jsx(
                SlideTabs,
                {
                  frequencies,
                  activeFrequency: frequency,
                  setActiveFrequency: setFrequency
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3", children: [
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  viewBox: "0 0 1208 1024",
                  "aria-hidden": "true",
                  className: "absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0",
                  children: [
                    /* @__PURE__ */ jsx(
                      "ellipse",
                      {
                        cx: 604,
                        cy: 512,
                        fill: "url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)",
                        rx: 604,
                        ry: 512
                      }
                    ),
                    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("radialGradient", { id: "d25c25d4-6d43-4bf9-b9ac-1842a30a4867", children: [
                      /* @__PURE__ */ jsx("stop", { stopColor: "#D87093" }),
                      /* @__PURE__ */ jsx("stop", { offset: 1, stopColor: "green" })
                    ] }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "lg:bg-welcomePrimary-40 hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:ring-1 lg:ring-white/10",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx(
                ProductCard,
                {
                  products,
                  frequency
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "relative bg-background md:pt-24" })
        ]
      }
    );
  }
);
const NewsletterSection = () => {
  return /* @__PURE__ */ jsx("div", { className: " h-[20rem] md:h-[32rem] w-full rounded-md bg-neutral-900 relative flex flex-col items-center justify-center antialiased", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-100  text-center font-sans font-bold", children: "Newsletter" }),
    /* @__PURE__ */ jsx("p", { className: "text-neutral-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10", children: "Inscrivez-vous à notre newsletter pour recevoir les dernières mises à jour et offres exclusives." }),
    /* @__PURE__ */ jsx(NewsletterForm, {})
  ] }) });
};
const data = [
  {
    date: "Juillet 2024",
    goal: "Google Analytics",
    content: "Intégration de votre propre Google Analytics pour suivre les performances de votre page hebergée et de votre formulaire de réservation"
  },
  {
    date: "Aout 2024",
    goal: "File d'attente",
    content: "En cas de restaurant complet sur un service. Vos clients pourront s'ajouter à une file d'attente, ainsi en cas d'annulation d'un autre client, ils seront automatiquement prévenus et pourront réserver la table libérée."
  },
  {
    date: "Aout 2024",
    goal: "Emprunte bancaire",
    content: "Mise en place d'un enregistrement d'emprunte bancaire pour limiter les no-shows et les annulations de dernière minute. Vos clients, si l'activez, devront payer un montant fixe pour réserver leur table. Ce montant sera déduit de leur addition finale."
  },
  {
    date: "Automne 2024",
    goal: "Click and Collect",
    content: "Intégration d'un système de click and collect pour permettre à vos clients de commander et de venir récupérer leur commande en restaurant. Vous pourrez, en supplément, activer le paiement en ligne de leur commande pour limiter les contacts en restaurant."
  }
];
const Roadmap = forwardRef((props, ref) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 }
    }
  };
  const children = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  return /* @__PURE__ */ jsx("div", { ref, ...props, id: "Roadmap", className: "overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto w-full max-w-4xl px-4 py-24", children: [
    /* @__PURE__ */ jsx("h3", { className: "header-welcome mb-10 text-center text-2xl font-bold text-neutral-700 md:text-5xl", children: "Roadmap" }),
    /* @__PURE__ */ jsx(
      m.div,
      {
        variants: container,
        initial: "hidden",
        whileInView: "show",
        className: "mx-auto max-w-4xl px-4",
        children: data.map((item, index) => /* @__PURE__ */ jsxs(
          m.div,
          {
            variants: children,
            transition: {
              duration: 1.5,
              type: "spring"
            },
            className: "group relative py-6 pl-8 sm:pl-32",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-welcomePrimary before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-welcomeBackground/90 after:bg-green-900 group-last:before:hidden sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]", children: [
                /* @__PURE__ */ jsx("time", { className: "left-1 mb-3 inline-flex h-fit min-h-6 w-fit min-w-20 -translate-x-3 translate-y-0.5 items-center justify-center rounded-full bg-welcomeBackground px-1.5 text-xs font-semibold uppercase text-green-900 sm:absolute sm:mb-0", children: item.date }),
                /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-neutral-800", children: item.goal })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-green-900/80", children: item.content })
            ]
          },
          index
        ))
      }
    )
  ] }) });
});
const createSelectors = (_store) => {
  let store = _store;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    store.use[k] = () => store((s) => s[k]);
  }
  return store;
};
const useAppContactModal = createSelectors(create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
})));
const AppContatModal = () => {
  const contactModalOnClose = useAppContactModal.use.onClose();
  const contactModalIsOpen = useAppContactModal.use.isOpen();
  const [loading, setLoading] = useState(false);
  const { data: data2, setData, post, processing, errors, reset } = useForm({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    subject: "",
    content: ""
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data2);
    post(route("contact.create"), {
      onStart: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        contactModalOnClose();
        reset();
        toast.success("Message envoyé avec succès.");
      },
      onError: (e2) => {
        setLoading(false);
        console.log(errors, e2);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    Modal,
    {
      dialogTitleClasses: "text-xl text-primary/80",
      title: `Contactez-nous`,
      description: "En cas de besoin contactez-nous. Nous vous répondrons dans les plus brefs délais.",
      isOpen: contactModalIsOpen,
      onClose: contactModalOnClose,
      dialogContentClasses: "bg-green-100",
      children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "space-y-4 py-2 pb-4", children: /* @__PURE__ */ jsx("form", { onSubmit, children: loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1", children: [
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Nom",
                fieldName: "last_name",
                error: errors.last_name,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "last_name",
                    type: "text",
                    name: "last_name",
                    placeholder: "Votre nom",
                    value: data2.last_name,
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => setData(
                      "last_name",
                      e.target.value
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Prénom",
                fieldName: "first_name",
                error: errors.first_name,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "first_name",
                    type: "text",
                    name: "first_name",
                    placeholder: "Votre prénom",
                    value: data2.first_name,
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => setData(
                      "first_name",
                      e.target.value
                    )
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-1", children: [
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Mail",
                fieldName: "email",
                error: errors.email,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "email",
                    type: "mail",
                    name: "email",
                    placeholder: "Votre adresse mail",
                    value: data2.email,
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => setData(
                      "email",
                      e.target.value
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              FormFieldLayout,
              {
                label: "Téléphone",
                fieldName: "phone",
                error: errors.phone,
                children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "phone",
                    type: "text",
                    name: "phone",
                    placeholder: "Votre numéro de téléphone",
                    value: data2.phone,
                    className: "mt-1 block w-full py-3 border",
                    onChange: (e) => setData(
                      "phone",
                      e.target.value
                    )
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Sujet",
              fieldName: "subject",
              error: errors.subject,
              children: /* @__PURE__ */ jsx(
                Input,
                {
                  id: "subject",
                  type: "text",
                  name: "subject",
                  placeholder: "Sujet de votre message",
                  value: data2.subject,
                  className: "mt-1 block w-full py-3 border",
                  onChange: (e) => setData(
                    "subject",
                    e.target.value
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormFieldLayout,
            {
              label: "Message",
              fieldName: "content",
              error: errors.content,
              children: /* @__PURE__ */ jsx(
                Textarea,
                {
                  placeholder: "Contenu de votre message",
                  className: "resize-none",
                  onChange: (e) => {
                    setData(
                      "content",
                      e.target.value
                    );
                  }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-6 space-x-2 flex items-center justify-center w-full", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              className: "w-full",
              disabled: loading,
              variant: "default",
              onClick: contactModalOnClose,
              children: "Annuler"
            }
          ),
          /* @__PURE__ */ jsx(
            SubmitButton,
            {
              disabled: loading || processing,
              className: "w-full  text-green-900 bg-welcomeBackground hover:bg-welcomeBackground/80",
              type: "submit",
              children: "Envoyer"
            }
          )
        ] })
      ] }) }) }) })
    }
  );
};
const AppContactButton = () => {
  const contactModalOnOpen = useAppContactModal.use.onOpen();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        size: "lg",
        onClick: () => contactModalOnOpen(),
        className: "bg-welcomeBackground text-green-900 hover:bg-welcomeBackground/80",
        children: [
          /* @__PURE__ */ jsxs("span", { children: [
            " ",
            /* @__PURE__ */ jsx(
              ChatBubbleLeftRightIcon,
              {
                className: "h-6 w-6 mr-2",
                "aria-hidden": "true"
              }
            )
          ] }),
          " ",
          "Contacter nous"
        ]
      }
    ),
    /* @__PURE__ */ jsx(AppContatModal, {})
  ] });
};
const Contact = forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      id: "Contact",
      ref,
      ...props,
      className: "md:-mt-20 md:mb-36 h-fit md:h-[32rem] md:bg-transparent isolate bg-white px-6 py-24 sm:py-32 lg:px-8",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl sm:text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "header-welcome  text-neutral-800  font-bold md:text-5xl text-2xl", children: "Nous contacter" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg leading-8 text-gray-600", children: "Pour toutes questions, suggestions ou demandes de support, n'hésitez pas à nous contacter." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-20 max-w-lg space-y-4 md:flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 ", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-x-6 items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground", children: /* @__PURE__ */ jsx(
                ChatBubbleLeftRightIcon,
                {
                  className: "h-6 w-6 text-green-900",
                  "aria-hidden": "true"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-7 text-gray-900", children: "Conseil commercial" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-x-6 items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground", children: /* @__PURE__ */ jsx(
                BugAntIcon,
                {
                  className: "h-6 w-6 text-green-900",
                  "aria-hidden": "true"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-7 text-gray-900", children: "Rapporter un bug" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-x-6 items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground", children: /* @__PURE__ */ jsx(
                ComputerDesktopIcon,
                {
                  className: "h-6 w-6 text-green-900",
                  "aria-hidden": "true"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-7 text-gray-900", children: "Support technique" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-x-6 items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-welcomeBackground", children: /* @__PURE__ */ jsx(
                QuestionMarkCircleIcon,
                {
                  className: "h-6 w-6 text-green-900",
                  "aria-hidden": "true"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold leading-7 text-gray-900", children: "Autre" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-5", children: [
            /* @__PURE__ */ jsx(AppContactButton, {}),
            /* @__PURE__ */ jsx("p", { children: "OU" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-6 w-6 text-green-900" }),
              /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "tel:+33612345678", children: "06 79 29 68 89" }) })
            ] })
          ] })
        ] })
      ]
    }
  );
});
const Footer = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "h-24 flex flex-col items-center justify-center w-full gap-3", children: [
      /* @__PURE__ */ jsx("div", { children: "LOGO" }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", { className: "flex items-center justify-center gap-3 leading-4 text-sm text-green-800 tracking-tight", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              router.visit(route("home"));
            },
            className: "text-green-800",
            variant: "link",
            children: "Mentions légales"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              router.visit(route("changelog"));
            },
            className: "text-green-800",
            variant: "link",
            children: "Changelog"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              router.visit(route("login"));
            },
            className: "text-green-800",
            variant: "link",
            children: "Connexion"
          }
        ) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t h-12 flex items-center justify-center", children: /* @__PURE__ */ jsxs("small", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " TrouveTaTable.fr - Tous droits réservés"
    ] }) })
  ] });
};
const AuthModal = () => {
  const contactModalOnClose = useAuthModal.use.onClose();
  const contactModalIsOpen = useAuthModal.use.isOpen();
  const contactModalTab = useAuthModal.use.tab();
  const [activeTab, setActiveTab] = useState(contactModalTab);
  function selectTab(tab) {
    setActiveTab(tab);
  }
  useEffect(() => {
    setActiveTab(contactModalTab);
  }, [contactModalTab]);
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: activeTab === "login" ? "Connexion" : "Inscription",
      isOpen: contactModalIsOpen,
      onClose: contactModalOnClose,
      dialogContentClasses: "md:max-w-md md:px-8",
      dialogTitleClasses: "text-xl ",
      description: activeTab === "login" ? "Connectez-vous à votre compte" : "Créez un compte pour continuer",
      children: /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
        activeTab === "login" && /* @__PURE__ */ jsx(
          LoginForm,
          {
            mode: "modal",
            onAlreadyHaveAnAccountClick: selectTab
          }
        ),
        activeTab === "register" && /* @__PURE__ */ jsx(
          RegisterForm,
          {
            mode: "modal",
            onAlreadyHaveAnAccountClick: selectTab
          }
        )
      ] })
    }
  );
};
function Welcome({ auth, products }) {
  const sectionRefs = useRef([]);
  const setUser = useUser.use.setUser();
  useEffect(() => {
    setUser(auth.user);
  });
  const tabs = [
    { id: "Home", label: "Accueil" },
    { id: "Features", label: "Avantages" },
    { id: "Price", label: "Prix" },
    { id: "Contact", label: "Contact" },
    { id: "Roadmap", label: "Roadmap" }
  ];
  usePage().props;
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    /* @__PURE__ */ jsx(AuthModal, {}),
    /* @__PURE__ */ jsx(LazyMotion, { features: domAnimation, children: /* @__PURE__ */ jsxs("div", { className: "min-h-[300vh] bg-background", children: [
      /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
      /* @__PURE__ */ jsx(Index, { tabs, sectionRefs }),
      /* @__PURE__ */ jsx(
        LandingHeader,
        {
          ref: (el) => sectionRefs.current[0] = el
        }
      ),
      /* @__PURE__ */ jsx(Features, { ref: (el) => sectionRefs.current[1] = el }),
      /* @__PURE__ */ jsx(
        StarterPrice,
        {
          ref: (el) => sectionRefs.current[2] = el,
          products: products.data
        }
      ),
      /* @__PURE__ */ jsx(Contact, { ref: (el) => sectionRefs.current[3] = el }),
      /* @__PURE__ */ jsx(NewsletterSection, {}),
      /* @__PURE__ */ jsx(Roadmap, { ref: (el) => sectionRefs.current[4] = el }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }) })
  ] });
}
const __vite_glob_0_74 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Welcome
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    // title: (title) => `${title} - ${appName}`,
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.tsx": __vite_glob_0_0, "./Pages/Auth/ForgotPassword.tsx": __vite_glob_0_1, "./Pages/Auth/Login.tsx": __vite_glob_0_2, "./Pages/Auth/Partials/Login/LoginForm.tsx": __vite_glob_0_3, "./Pages/Auth/Partials/Register/RegisterForm.tsx": __vite_glob_0_4, "./Pages/Auth/Register.tsx": __vite_glob_0_5, "./Pages/Auth/ResetPassword.tsx": __vite_glob_0_6, "./Pages/Auth/VerifyEmail.tsx": __vite_glob_0_7, "./Pages/Bye.tsx": __vite_glob_0_8, "./Pages/Changelog/Index.tsx": __vite_glob_0_9, "./Pages/Dashboard.tsx": __vite_glob_0_10, "./Pages/Dashboard/Hours/Index.tsx": __vite_glob_0_11, "./Pages/Dashboard/Hours/Partials/AcceptReservation.tsx": __vite_glob_0_12, "./Pages/Dashboard/Hours/Partials/OpeningHours.tsx": __vite_glob_0_13, "./Pages/Dashboard/Hours/Partials/SelectTamponService.tsx": __vite_glob_0_14, "./Pages/Dashboard/Hours/Partials/StopReservation.tsx": __vite_glob_0_15, "./Pages/Dashboard/Messages/Index.tsx": __vite_glob_0_16, "./Pages/Dashboard/Messages/Partials/EnableDisableContactMessage.tsx": __vite_glob_0_17, "./Pages/Dashboard/Messages/Partials/SelectedMessage.tsx": __vite_glob_0_18, "./Pages/Dashboard/Newsletter/Partials/cell-action.tsx": __vite_glob_0_19, "./Pages/Dashboard/Newsletter/Partials/columns.tsx": __vite_glob_0_20, "./Pages/Dashboard/Newsletter/Partials/data-table.tsx": __vite_glob_0_21, "./Pages/Dashboard/Newsletter/Users.tsx": __vite_glob_0_22, "./Pages/Dashboard/Page/Index.tsx": __vite_glob_0_23, "./Pages/Dashboard/Page/Partials/EnablePage.tsx": __vite_glob_0_24, "./Pages/Dashboard/Ratings/Index.tsx": __vite_glob_0_25, "./Pages/Dashboard/Ratings/Partials/AcceptRating.tsx": __vite_glob_0_26, "./Pages/Dashboard/Ratings/Rating/Avis.tsx": __vite_glob_0_27, "./Pages/Dashboard/Ratings/Rating/Note.tsx": __vite_glob_0_28, "./Pages/Dashboard/Ratings/Rating/RatingCard.tsx": __vite_glob_0_29, "./Pages/Dashboard/Reservation/Index.tsx": __vite_glob_0_30, "./Pages/Dashboard/Reservation/Partials/CalendarReservation.tsx": __vite_glob_0_31, "./Pages/Dashboard/Reservation/Partials/ListOfReservation.tsx": __vite_glob_0_32, "./Pages/Dashboard/Settings/Index.tsx": __vite_glob_0_33, "./Pages/Dashboard/Settings/Notifications/Index.tsx": __vite_glob_0_34, "./Pages/Dashboard/Settings/Notifications/Partials/CanNotUseBooking.tsx": __vite_glob_0_35, "./Pages/Dashboard/Settings/Notifications/Partials/CanNotUseMessages.tsx": __vite_glob_0_36, "./Pages/Dashboard/Settings/Notifications/Partials/Forms/AdminNotificationBooking.tsx": __vite_glob_0_37, "./Pages/Dashboard/Settings/Notifications/Partials/Forms/AdminNotificationMessages.tsx": __vite_glob_0_38, "./Pages/Dashboard/Settings/Notifications/Partials/Forms/ClientNotificationBooking.tsx": __vite_glob_0_39, "./Pages/Dashboard/Tables/Index.tsx": __vite_glob_0_40, "./Pages/Dashboard/Tables/Partials/cell-action.tsx": __vite_glob_0_41, "./Pages/Dashboard/Tables/Partials/columns.tsx": __vite_glob_0_42, "./Pages/Dashboard/Tables/Partials/data-table.tsx": __vite_glob_0_43, "./Pages/Error403.tsx": __vite_glob_0_44, "./Pages/Error404.tsx": __vite_glob_0_45, "./Pages/Profile/Billings/Edit.tsx": __vite_glob_0_46, "./Pages/Profile/Edit.tsx": __vite_glob_0_47, "./Pages/Profile/Partials/CancelSubscription.tsx": __vite_glob_0_48, "./Pages/Profile/Partials/DeleteUserForm.tsx": __vite_glob_0_49, "./Pages/Profile/Partials/Invoices.tsx": __vite_glob_0_50, "./Pages/Profile/Partials/UpdatePasswordForm.tsx": __vite_glob_0_51, "./Pages/Profile/Partials/UpdateProfileInformationForm.tsx": __vite_glob_0_52, "./Pages/Public/Contact/Index.tsx": __vite_glob_0_53, "./Pages/Public/Rating/Index.tsx": __vite_glob_0_54, "./Pages/Public/Rating/Partials/Form.tsx": __vite_glob_0_55, "./Pages/Public/Reservation/Form/DateInput.tsx": __vite_glob_0_56, "./Pages/Public/Reservation/Form/Index.tsx": __vite_glob_0_57, "./Pages/Public/Reservation/Form/TableInput.tsx": __vite_glob_0_58, "./Pages/Public/Reservation/Form/TimeAndGuestSelector.tsx": __vite_glob_0_59, "./Pages/Public/Reservation/RestaurantCanNotAcceptReservation.tsx": __vite_glob_0_60, "./Pages/Public/Restaurant/PageNotAvailable.tsx": __vite_glob_0_61, "./Pages/Public/Restaurant/Partials/ContactCard.tsx": __vite_glob_0_62, "./Pages/Public/Restaurant/Partials/DescriptionCard.tsx": __vite_glob_0_63, "./Pages/Public/Restaurant/Partials/HoursCard.tsx": __vite_glob_0_64, "./Pages/Public/Restaurant/Partials/MenuCard.tsx": __vite_glob_0_65, "./Pages/Public/Restaurant/Partials/NewsletterCard.tsx": __vite_glob_0_66, "./Pages/Public/Restaurant/Partials/PageContent.tsx": __vite_glob_0_67, "./Pages/Public/Restaurant/Partials/Rating/Avis.tsx": __vite_glob_0_68, "./Pages/Public/Restaurant/Partials/Rating/Note.tsx": __vite_glob_0_69, "./Pages/Public/Restaurant/Partials/Rating/RatingCard.tsx": __vite_glob_0_70, "./Pages/Public/Restaurant/RestaurantPage.tsx": __vite_glob_0_71, "./Pages/Restaurant/Create/CreateRestaurant.tsx": __vite_glob_0_72, "./Pages/Subscribe/Index.tsx": __vite_glob_0_73, "./Pages/Welcome.tsx": __vite_glob_0_74 });
      return pages[`./Pages/${name}.tsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
