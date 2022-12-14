import { NextPage } from "next";
import Head from "next/head"
import favicon from '../assets/images/favicon-32x32.png';

import { GetServerSideProps } from "next";

import Thread from "../components/Thread";
import AddComment from "../components/AddComment";


import { DataContextType } from "../TypesAndInterfaces";

import { useSession } from "next-auth/react";

import styles from '../styles/Home.module.scss';
import { useContext } from "react";
import { DataContext } from "../useDataContext";
import Modals from "../components/Modal";

import LoadingScreen from '../components/LoadingScreen';
import AuthSection from "../components/AuthSection";

const Home:NextPage = () =>{

  const {state} = useContext(DataContext) as DataContextType;
  
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src}/>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      {
        state.loadingState === 'notLoad'? <LoadingScreen />:
        <main className={styles.main}>
          { state.loadingState === 'loading' && <LoadingScreen />}

          <AuthSection />
          
          {
            state.data.comments.map((thread) => (
                      <Thread 
                        key={thread.content}
                        threadData={thread}/>
                    ))
          }
          
          { state.data.currentUser && <AddComment type='THREAD' /> }
          
          <Modals/>
        </main>
      }
    </>
  )
}

export default Home;