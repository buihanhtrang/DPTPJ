"use client"

import Image from 'next/image'
import styles from './page.module.css'
import Appbar from '@/components/appbar/component'
import DiscountCard from '@/components/discounts_card/component'
import { useRef } from 'react';
import ProductCard from '@/components/product_card/component'
import { motion } from 'framer-motion'
import { IProduct } from '@/models/product'
import { containerVariants, itemVariants } from '@/styles/variants'


const products: Array<IProduct> = [
  {
    image: '/assets/cozy-1.jpg',
    name: 'Round Chair',
    description: 'Some Description here',
    discount: 78,
    href: '/'
  },
  {
    image: '/assets/cozy-2.jpg',
    name: 'Sofa Chair',
    description: 'Some Description here',
    discount: 56,
    href: '/'
  },
]
export default function Home() {
  const shopRef = useRef<null | HTMLDivElement>(null)

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


        <div ref={shopRef} />


        {/* list of product sections */}

        {/* top deals section */}
        <motion.h1 variants={itemVariants} className={styles.productSectionTitle}>
          Top Deals
        </motion.h1>
        <motion.div className={styles.productGrid} variants={containerVariants}>
          {
            products.map((product, i)=> {

              return (
                <ProductCard key={i} product={product} />
              )
            })
          }
        </motion.div>


      </motion.div>

      <div style={{ height: '10vh', }} />

    </div>
  )
}
