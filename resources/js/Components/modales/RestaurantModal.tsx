
import { FormEventHandler, useState } from "react";

import { Modal } from "@/Components/ui/modal";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {Loader} from "@/Components/loader";
import { useRestaurantModal } from "@/hooks/useRestaurantModal";
import { useForm } from "@inertiajs/react";
import FormFieldLayout from "../layout/form-field-layout";


export const RestaurantModal = () => {
 
  const restaurantModalOnClose = useRestaurantModal.use.onClose()
  const restaurantModalIsOpen = useRestaurantModal.use.isOpen()
  
  const [loading, setLoading] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
});

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("restaurant.store"), {
      onStart: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        restaurantModalOnClose();
        reset();
        // toast.success("Restaurant créé avec succès.");
      },
      onError: () => {
        setLoading(false);
      },
    
    });
  };

  return (
    <Modal
      title="Créer un restaurant"
      description="Ajouter un restaurant pour commencer à utiliser l'application."
      isOpen={restaurantModalIsOpen} 
      onClose={restaurantModalOnClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
              <form 
              onSubmit={onSubmit}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                ) : (
                <div>
                     <FormFieldLayout
                        label="Nom du restaurant"
                        fieldName="name"
                        error={errors.name}
                    >
                        <Input
                            id="name"
                            type="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full py-3 border"
                            autoComplete="username"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </FormFieldLayout>
                
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button 
                    type="button"
                    disabled={loading} variant="outline" onClick={restaurantModalOnClose}>
                      Annuler
                    </Button>
                    <Button disabled={loading} type="submit"
                    
                    >Continuer</Button>
                  </div>
                </div>
                )}

              </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};