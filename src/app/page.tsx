"use client"
import { useRef } from 'react';
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

// models
import { IProduct } from '@/models/product'

// styles
import { containerVariants, itemVariants } from '@/styles/variants'
import styles from './page.module.css'


const products: Array<IProduct> = [
  {
    image: '/assets/cozy-1.jpg',
    // image: '/assets/round-chair-4.jpeg',
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

        {/* more info */}
        <MoreCard />

        {/* developer info */}
        {/* title */}
        <motion.h1 ref={shopRef} variants={itemVariants} className={styles.developerSectionTitle}>
          About The Developer
        </motion.h1>
        <motion.h2 ref={shopRef} variants={itemVariants} className={styles.developerSectionSubTitle}>
          Felix.
        </motion.h2>
        <DeveloperInfo />

      </motion.div>

      <div style={{ height: '10vh', }} />

    </div>
  )
}
