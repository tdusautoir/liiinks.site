import { SignupForm } from "./components/SignupForm";

export default async function Signup() {
    return (
        <div className="flex flex-1 flex-col m-auto w-4/5 p-4 gap-8">
            <h1 className="text-2xl">Enregistrer</h1>
            <SignupForm />
        </div>

    )
}