import { NextPage } from "next";
import Head from "next/head"
import { FunctionComponent } from "react";
import favicon from '../assets/images/favicon-32x32.png';

import dataJSON from '../data.json';

const Home:NextPage<{data:any}> = ({data}) =>{
  
  
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
        <link rel="icon" type="image/png" sizes="32x32" href={favicon.src}/>
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      {
        data.comments.map((comment:object) => (
          console.log(comment)
        ))
      }
    </>
  )
}

export default Home;


export async function getServerSideProps() {
  return {
    props: {
      data: dataJSON
    }
  }
}
