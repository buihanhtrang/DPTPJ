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
import Link from 'next/link'


const LoaderProp =({ src }) => {
    return src;
}

type ProductCardProps = {
    product: IProduct
    onAddToCompare: ()=>void
}
const ProductCard = ({ product: { image, name, description, discount, hreff, }, onAddToCompare}: ProductCardProps) => {
    const width = useWindowWidth()
    const isMobile = width < 800


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
                                href={hreff}
                                size='large'
                                style={{
                                    textTransform: 'none',
                                }}
                            >
                                Detail
                            </Button>
                            <Button
                                variant='contained'
                                disableElevation
                                size='large'
                                style={{
                                    textTransform: 'none',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn hành vi click bubble lên phần tử cha
                                    onAddToCompare(); // Gọi hàm thêm vào danh sách so sánh
                                }}
                            >
                                Add to compare
                            </Button>
                        </motion.div>
                }

                {
                    !isMobile &&
                        <div className={styles.cardContentCta}>
                            <Button
                                variant='contained'
                                disableElevation
                                size='large'
                                href={hreff}
                                style={{
                                    textTransform: 'none',
                                }}
                            >
                                Detail
                            </Button>
                            <Button
                                variant='contained'
                                disableElevation
                                size='large'
                                style={{
                                    textTransform: 'none',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn hành vi click bubble lên phần tử cha
                                    onAddToCompare(); // Gọi hàm thêm vào danh sách so sánh
                                }}
                            >
                                Add to compare
                            </Button>
                        </div>
                }

            </motion.div>

        </motion.div>
    )
}

export default ProductCard
