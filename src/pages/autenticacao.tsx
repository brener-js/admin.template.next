import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconGoogle, IconWarning } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {
  const { register, login, loginGoogle } = useAuth();

  const [error, setError] = useState(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function showError(msg, timeOut = 5) {
    setError(msg);
    setTimeout(() => setError(null), timeOut * 1000);
  }

  async function submit() {
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      showError(err?.message ?? "Erro inesperado");
    }
  }

  return (
    <div className={`flex h-screen items-center justify-center`}>
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da Tela de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
        <h1
          className={`
        text-3xl font-bold mb-5 
      `}
        >
          {mode === "login"
            ? "Entre com a sua Conta"
            : "Cadastre-se na Plataforma"}
        </h1>

        {error ? (
          <div
            className={`
            flex items-center
            bg-red-400 text-white py-3 px-5 my-2
            border border-red-700 rounded-lg
        `}
          >
            {IconWarning()}
            <span className="ml-3">{error}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          label="Email"
          value={email}
          type="email"
          onChange={setEmail}
          required
        />
        <AuthInput
          label="Senha"
          value={password}
          type="password"
          onChange={setPassword}
          required
        />

        <button
          onClick={submit}
          className={`
        w-full bg-indigo-500 hover:bg-indigo-400
        text-white rounded-lg px-4 py-3 mt-6
      `}
        >
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={loginGoogle}
          className={`
        flex justify-center items-center
        w-full bg-white hover:bg-gray-200
        text-gray-600 font-bold rounded-lg px-4 py-3
        border-2 border-blue-600
      `}
        >
          <div className={`mr-4`}>{IconGoogle}</div>
          Logar com o Google
        </button>

        {mode === "login" ? (
          <p className="mt-8">
            Novo por aqui?{" "}
            <a
              onClick={() => setMode("register")}
              className={`
                    text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                `}
            >
              Crie uma conta agora
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?{" "}
            <a
              onClick={() => setMode("login")}
              className={`
                    text-blue-500 hover:text-blue-700 font-semibold cursor-pointer
                `}
            >
              Entre com a sua conta
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
