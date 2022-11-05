import { NextPage } from "next";
import Head from "next/head"
import favicon from '../assets/images/favicon-32x32.png';

import { GetServerSideProps } from "next";

import Thread from "../components/Thread";
import dataJSON from '../data.json';

import { DataType } from "../TypesAndInterfaces";

import styles from '../styles/Home.module.scss';
import { useContext, useEffect } from "react";
import { DataContext } from "../useDataContext";


const Home:NextPage<{dataProps:DataType}> = ({dataProps}) =>{

  const {data, setData} = useContext(DataContext);
  
  useEffect(() => {
    setData(dataProps);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProps]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src}/>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      <main className={styles.main}>
        {
          data === null
            ? "Loading ..."
            :data.comments.map((thread) => (
              <Thread 
                key={thread.content}
                data={thread}/>
            ))
        }
      </main>
    </>
  )
}

export default Home;




export const getServerSideProps:GetServerSideProps<{dataProps: DataType}> = async () => {
  return {
    props: {
      dataProps: dataJSON
    }
  }
}
