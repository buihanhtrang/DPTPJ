"use client"

import { useRef } from 'react';
import { motion } from 'framer-motion'
import Link from 'next/link'

// component
import ProductCard from '@/components/product_card/component'
import Appbar from '@/components/appbar/component'
import DiscountCard from '@/components/discounts_card/component'

// models
import { IProduct } from '@/models/product'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import styles from './page.module.css'
import MoreCard from '@/components/more/component';
import Fab from '@mui/material/Fab';
import { MdKeyboardArrowRight } from 'react-icons/md';

const products: Array<IProduct> = [
  {
    image: '/assets/cozy-1.jpg',
    name: 'Round Chair',
    description: 'Some Description here',
    discount: 78,
    href: '/round'
  },
  {
    image: '/assets/small-sofa-1.jpg',
    name: 'Sofa Chair',
    description: 'Some Description here',
    discount: 56,
    href: '/armchair'
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

          {/* more */}
          <Fab color="primary" aria-label="More" size='small'>
            <MdKeyboardArrowRight />
          </Fab>

        </motion.div>
        <motion.div className={styles.productGrid} variants={containerVariants}>
          {
            products.map((product, i)=> {

              return (
                <motion.div key={i}>
                  <Link href={product.href}>
                      <ProductCard product={product} />
                  </Link>
                </motion.div>
              )
            })
          }
        </motion.div>

        <MoreCard />


      </motion.div>

      <div style={{ height: '10vh', }} />

    </div>
  )
}
