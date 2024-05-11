import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import FormFieldLayout from '@/Components/layout/form-field-layout';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <GuestLayout
        title='Confirmation du mot de passe'
        >
            <Head title="Confirmation du mot de passe" />

            <div className="mb-4 text-sm text-gray-600">
                C'est une zone sécurisée de l'application. Veuillez confirmer votre mot de passe avant de continuer.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <FormFieldLayout
                     label="Mot de passe"
                     fieldName="password"
                     error={errors.password}
                    >
                        <Input 
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('password', e.target.value)}
                        />
                    </FormFieldLayout>                
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        Confirmer
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
