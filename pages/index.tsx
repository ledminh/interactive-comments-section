import { NextPage } from "next";
import Head from "next/head"
import favicon from '../assets/images/favicon-32x32.png';

import { GetServerSideProps } from "next";

import Thread from "../components/Thread";
import AddComment from "../components/AddComment";

// import dataJSON from '../data.json';
import clientPromise from '../utils/mongodb';


import { DataContextType, DataType, ThreadType, CommentType, ReplyType } from "../TypesAndInterfaces";

import styles from '../styles/Home.module.scss';
import { useContext, useEffect } from "react";
import { DataContext } from "../useDataContext";
import Modals from "../components/Modal";



const Home:NextPage = () =>{

  const {data, setData} = useContext(DataContext) as DataContextType;
  

  useEffect(() => {
    if(data === null){
      fetch('/api/get-threads')
        .then(res => res.json())
        .then(threads => setData({
              comments: threads,
              currentUser: {
                  id: '636969580c2f2107e31bf931',
                  "image": { 
                  "png": "./images/avatars/image-juliusomo.png",
                  "webp": "./images/avatars/image-juliusomo.webp"
                  },
                  "username": "juliusomo"
              }
          }))
    }
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
          data === null? "Loading ...": threadsGenerator(data.comments)
        }
        <AddComment 
          type='THREAD' 
          />
        <Modals/>
      </main>
    </>
  )
}

export default Home;




/*****************************************/

const threadsGenerator = (threads:ThreadType[]) => threads.map((thread) => (
  <Thread 
    key={thread.content}
    threadData={thread}/>
))


