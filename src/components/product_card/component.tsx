"use client"
import React from 'react'
import { Button, } from '@mui/material'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useWindowWidth } from '@react-hook/window-size'


// models
import { IProduct } from '@/models/product'


// styles
import { containerVariants, itemVariants, slideUpVariants, } from '@/styles/variants'
import styles from './component.module.css'


const LoaderProp =({ src }) => {
    return src;
}

type ProductCardProps = {
    product: IProduct
}
const ProductCard = ({ product: { image, name, description, discount, href, }, }: ProductCardProps) => {
    const width = useWindowWidth()
    const isMobile = width < 1000


    return (
        <motion.div
            className={styles.card}
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >

            {/* image */}
            <Image
                src={image as string}
                alt='Discount Image'
                width={100}
                height={200}
                className={styles.image}
                loader={LoaderProp}
            />


            <motion.div className={styles.cardContentOff}>
                { discount }% Off
            </motion.div>

            {/* content */}
            <motion.div className={styles.cardContent}>

                <motion.p className={styles.cardContentTitle}>
                    { name }
                </motion.p>

                <motion.p className={styles.cardContentDescription}>
                    { description }
                </motion.p>


                {
                    isMobile &&
                        <motion.div variants={slideUpVariants}>
                            <Button
                                variant='contained'
                                disableElevation
                                href={href}
                                size='large'
                                style={{
                                    textTransform: 'none',
                                }}
                            >
                                Buy Now
                            </Button>
                        </motion.div>
                }

                {
                    !isMobile &&
                        <div className={styles.cardContentCta}>
                            <Button
                                variant='contained'
                                disableElevation
                                href={href}
                                size='large'
                                style={{
                                    textTransform: 'none',
                                }}
                            >
                                Buy Now
                            </Button>
                        </div>
                }

            </motion.div>

        </motion.div>
    )
}

export default ProductCard
