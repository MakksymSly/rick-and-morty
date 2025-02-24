'use client'
import { CardsList } from "@/components/CardsList/CardsList";
import { getData } from "@/services/api";
import { Data } from "@/types/Data";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export default function Home() {

  const {data, isSuccess, isLoading, isError} = useQuery({ queryKey: ['characters'], queryFn: () => getData(Data.Characters) })
  

  useEffect(() => { 
    if(isSuccess) console.log(data)
  }, [isSuccess,data])

  useEffect(() => {
    if(isError) console.log(isError)
  }, [isError])
  

  return (
    <>
      <div className="container mx-auto">
        <div className="cards">

        {isLoading ? <div>Loading</div> : <CardsList characters={data?.results}/>}
        </div>
      

      </div>
    </>
   
  );
}
