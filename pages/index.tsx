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

import { UserInfo } from "../TypesAndInterfaces";


const Home:NextPage<{dataProps:DataType}> = ({dataProps}) =>{

  const {data, setData} = useContext(DataContext) as DataContextType;
  
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


export const getServerSideProps:GetServerSideProps<{dataProps:DataType}> = async () => {
    /************************************** */ 
    //Setup data
    const client = await clientPromise;
    const db = client.db("interactive-comment-section");
    

    /************************************** */
    // Load data
    const comments = await db
        .collection("comments")
        .find().toArray();
    
        
    const users = await db
        .collection("users")
        .find().toArray();
      

    /************************************** */
    //Prepare data
    
      //usersObj
    const usersObj:{[key:string]: UserInfo} = {};
    users.forEach(u => usersObj[u._id.toString()] = {
      id: u._id.toString(),
      image: {
        png: u.image.png,
        webp: u.image.webp
      },
      username: u.username
    });
    
      //repliessObj
    const repliesObj:{[key:string]: ReplyType} = {};
    
    comments.forEach(com => {
      if(com.type === 'REPLY') {
        repliesObj[com._id.toString()] = {
          id: com._id.toString(),
          content: com.content,
          createdAt: com.createdAt,
          replyingTo: usersObj[com.replyingToID].username,
          score: com.upvotes.length - com.downvotes.length,
          user: usersObj[com.authorID],
          upvotes: com.upvotes,
          downvotes: com.downvotes
        }
      }

    });


      // threads array
    const threads:ThreadType[] = [];
    
    comments.forEach((comment) => {
      if(comment.type === 'THREAD'){

        const thread:ThreadType = {
          id: comment._id.toString(),
          content: comment.content,
          createdAt: comment.createdAt,
          score: comment.upvotes.length - comment.downvotes.length,
          user: usersObj[comment.authorID],
          
          replies: (comment.replyIDs as string[]).filter(id => id !== '').map(id => repliesObj[id]),
          upvotes: comment.upvotes,
          downvotes: comment.downvotes
        
        }
        
        threads.push(thread);
      }

      }
      
    );



    return {
        props: { dataProps: JSON.parse(JSON.stringify({
          comments: threads,
          currentUser: {
            id: '636969580c2f2107e31bf931',
            "image": { 
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            "username": "juliusomo"
          }
        }))},
    };
}


/*****************************************/

const threadsGenerator = (threads:ThreadType[]) => threads.map((thread) => (
  <Thread 
    key={thread.content}
    data={thread}/>
))