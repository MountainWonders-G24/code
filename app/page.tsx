'use client'
import Image from 'next/image'
import { Button } from 'antd'
import Link from 'next/link'
import './page.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
  
  return (

    <div id='main'>
      <div id='logo'>
        <h1>MOUNTAIN</h1>
        <h1>wonders</h1>
      </div>
      <div id='buttons'>
        <Button href='../main-pages/refuges?mountainId=0'>
          RIFUGI
        </Button>
        <Button href='../main-pages/mountains-page'>
          MONTAGNE
        </Button>
      </div>
    </div>


  )
}

