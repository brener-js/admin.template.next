import { ReactNode } from "react";
import useAppData from "../../data/hook/useAppData";
import forceAuth from "../../functions/ForceAuth";

import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { theme } = useAppData();

  return forceAuth(
    <div className={`${theme} flex h-screen w-screen`}>
      <Sidebar />
      <div
        className={`
        flex flex-col w-full p-7 
        bg-gray-300 dark:bg-gray-800
      `}
      >
        <Header title={props.title} subtitle={props.subtitle} />
        <Content>{props.children}</Content>
      </div>
    </div>
  );
}
