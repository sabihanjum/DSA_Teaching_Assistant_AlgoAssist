
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default Index;
