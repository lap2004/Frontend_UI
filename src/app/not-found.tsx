"use client";
import { Box, Button, Container } from '@mui/material';
import Icon from '../components/test';
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
const MotionBox = motion(Box);
export default function NotFound() {
    const router = useRouter();
    return (
        <Container>
            <Box className="flex h-screen items-center justify-center">
                <Icon icon='notFound' width={310} height={340} viewBoxWidth={310} viewBoxHeight={340} fill='none' />
                <Box className="flex flex-col items-center justify-start gap-4" maxWidth={400}>
                    <p className="text-black font-bold text-3xl">Oops, Something went wrong</p>
                    <p className='text-xl'>Page not found</p>
                    <span className='flex '>The link you click maybe broken or the page may have been removed or renamed.</span>
                    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            '&:hover': {
                                backgroundColor: '#333'
                            }
                            
                        }} onClick={()=>router.push("/")}>BACK TO HOME</Button>
                    </MotionBox>
                </Box>
            </Box>

        </Container>
    );
}