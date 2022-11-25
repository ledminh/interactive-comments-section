import { NextPage } from "next";
import Head from "next/head"
import favicon from '../assets/images/favicon-32x32.png';

import { GetServerSideProps } from "next";

import Thread from "../components/Thread";
import AddComment from "../components/AddComment";


import { DataContextType } from "../TypesAndInterfaces";

import { useSession } from "next-auth/react";

import styles from '../styles/Home.module.scss';
import { useContext, useEffect } from "react";
import { DataContext } from "../useDataContext";
import Modals from "../components/Modal";

import LoadingScreen from '../components/LoadingScreen';
import AuthSection from "../components/AuthSection";

const Home:NextPage = () =>{

  const {state} = useContext(DataContext) as DataContextType;
  const { data: session } = useSession()  


  
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src}/>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      {
        state.loadingState === 'notLoad'? 'LOADING ....' :
        <main className={styles.main}>
          <AuthSection />
          {
            state.loadingState === 'loading'?            
                <LoadingScreen />
              :null
          }
          {
            state.data.comments.map((thread) => (
                      <Thread 
                        key={thread.content}
                        threadData={thread}/>
                    ))
          }
          {
            session? 
            <AddComment 
              type='THREAD' 
              />: null
          }
          <Modals/>
        </main>
      }
    </>
  )
}

export default Home;