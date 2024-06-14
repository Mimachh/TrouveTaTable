import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import FormFieldLayout from "@/Components/layout/form-field-layout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import RegisterForm from "./Partials/Register/RegisterForm";

export default function Register() {


    return (
        <GuestLayout
        title="Inscription"
        >
            <Head title="Inscription" />

           <RegisterForm />
        </GuestLayout>
    );
}
