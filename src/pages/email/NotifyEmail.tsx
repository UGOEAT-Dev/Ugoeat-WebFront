import { Button } from "primereact/button";
import Card from "./components/Card";
import { Icon } from "@/features/common/components/elements/Icon";
import { useQueryUrl } from "@/features/common/hooks";
import { useEmailVerificationNotifier } from "@/features/auth/hooks";

export default function NotifyEmail() {

    const { email } = useQueryUrl()
    const {notify, mutator} = useEmailVerificationNotifier()

    return (
        <div className="min-h-screen justify-center bg-gray-100 flex flex-col text-center">
            <Card>
                <h1 className="font-bold text-xl">Verifiez votre email</h1>
                <div className="flex flex-col gap-5 mt-3">
                    <p>Verifiez votre adresse email en cliquant sur le bouton ci-dessous pour beneficier de nos differents service.</p>
                    <Button 
                        label={mutator.isSuccess ? "Email Envoyé avec success" : "Envoyez le lien de verification"} 
                        className={`text-white py-2 px-3 bg-primary`} 
                        disabled={mutator.isSuccess}
                        onClick={() => notify(email as string)}>
                        {mutator.isSuccess ?
                            <Icon icon="pi-check-circle"/> :
                            <Icon icon="pi-envelope" />
                        } 
                    </Button>
                </div>
            </Card>
        </div>
    )
}