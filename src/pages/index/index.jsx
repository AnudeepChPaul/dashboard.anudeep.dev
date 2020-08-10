import React, {useEffect} from 'react';
import Router from "next/router";

export default function Home() {
  useEffect(() => {
    Router.prefetch('/dashboard');
  });

  useEffect(() => {
    Router.push('/dashboard');
  });


  return (
    <div/>
  );
}
