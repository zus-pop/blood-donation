import { Droplets } from "lucide-react"

import { LoginForm } from "../../components/ui/login-form"

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div>
                            <Droplets className="h-6 w-6 text-red-600" />
                        </div>
                        <span className="text-xl font-bold">Bloody</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-white relative hidden lg:flex items-center justify-center">
                <img
                    src="banner.jpg"
                    alt="Image"
                    className="absolute h-full w-200 object-contain dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div >
    )
}
