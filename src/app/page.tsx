"use client"
import { useRef, useState } from 'react';
import { motion } from 'framer-motion'
import Link from 'next/link'
import Fab from '@mui/material/Fab';
import { MdKeyboardArrowRight } from 'react-icons/md';

// component
import ProductCard from '@/components/product_card/component'
import Appbar from '@/components/appbar/component'
import DiscountCard from '@/components/discounts_card/component'
import DeveloperInfo from '@/components/developer/component';
import MoreCard from '@/components/more/component';
import CompareTable from "@/components/compare_table/component";
import CompareBar from "@/components/compare_bar/component";
import ChatModal from "@/components/chat_modal/component";

// models
import { IProduct } from '@/models/product'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import styles from './page.module.css'

import computers from "../../public/computer.json"; // JSON file for product details

export default function Home() {
  const shopRef = useRef<null | HTMLDivElement>(null)
  const [compareList, setCompareList] = useState<IProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.page}>

      {/* app bar */}
      <Appbar />

      <motion.div
        className={styles.pageContent}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >

        {/* discount card */}
        <DiscountCard scrollToShop={scrollToShop} />


        {/* <div ref={shopRef} /> */}

        {/* list of product sections */}

        {/* top deals section */}
        <motion.div
          className={styles.productSectionTitleContainer}
          variants={containerVariants}
        >
          
          {/* title */}
          <motion.h1 ref={shopRef} variants={itemVariants} className={styles.productSectionTitle}>
            Top Deals
          </motion.h1>

          {/* more
          <Fab color="primary" aria-label="More" size='small'>
            <MdKeyboardArrowRight />
          </Fab> */}

        </motion.div>
        <motion.div className={styles.productGrid} variants={containerVariants}>
          {
            computers.map((product, i)=> {

              return (
                <motion.div key={i}>
                  <ProductCard
                    product={product} // Load trực tiếp dữ liệu từ JSON
                    onAddToCompare={() => {
                        if (compareList.length >= 3) {
                          alert("You can only compare up to 3 products!");
                          return;
                        }
                    
                        if (compareList.some((item) => item.name === product.name)) {
                          alert("This product is already in the comparison list!");
                          return;
                        }                    
                        setCompareList([...compareList, product]);
                    }} // Gọi hàm thêm vào compare list
                  />
                </motion.div>
              )
            })
          }
        </motion.div>

        {/* more info */}
        <MoreCard />

        {/* developer info */}
        {/* title */}
        <motion.h1 ref={shopRef} variants={itemVariants} className={styles.developerSectionTitle}>
          About The Developer
        </motion.h1>
        <motion.h2 ref={shopRef} variants={itemVariants} className={styles.developerSectionSubTitle}>
          H2TL Computer Shop
          Digital Mulimedia Content Programming
          Final Project - 2024
        </motion.h2>
        <DeveloperInfo />

      </motion.div>

      {/* Compare Bar */}
      {(compareList.length > 0) && (
        <div>
          <CompareBar
            compareList={compareList}
            openModal={()=>{setIsCompareOpen(true)}}
            removeFromCompare={(productToRemove) => {
              setCompareList(compareList.filter((product) => product !== productToRemove));}}/>
        </div>
      )}

      {/* Compare Modal */}
      {isCompareOpen && (
        <div>
          <CompareTable 
            compareList={compareList}
            closeModal={()=>{setIsCompareOpen(false)}}/>
        </div>
      )}

      {/* Chat Modal */}
      {(
        <div>
          <ChatModal/>
        </div>
      )}

      <div style={{ height: "10vh" }} />
    </div>
  );
}
