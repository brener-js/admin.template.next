import Head from "next/head";
import route from "next/router";
import Image from "next/image";
import loadingGif from "../../public/images/loading.gif";
import useAuth from "../data/hook/useAuth";

export default function forceAuth(jsx) {
  const { user, loading } = useAuth();

  function renderContent() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if(!document.cookie?.includes('admin-template')) {
                    window.location.href = '/autenticacao'
                }
            `,
            }}
          ></script>
        </Head>
        {jsx}
      </>
    );
  }

  function renderLoading() {
    return (
      <div
        className={`
                flex justify-center items-center h-screen
            `}
      >
        <Image src={loadingGif} />
      </div>
    );
  }

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    route.push("/autenticacao");
    return null;
  }
}
