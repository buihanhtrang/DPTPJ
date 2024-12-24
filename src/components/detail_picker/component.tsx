import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// styles
import './component.scss';

const DetailPickerComponent: React.FC<{ selectedDetail: string; onDetailChange: (newDetail: string) => void; }> = ({ selectedDetail, onDetailChange }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.01, 1000);
        camera.position.set(0, 10, 10);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvasRef.current
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x404040, 1);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Groups
        const group1 = new THREE.Group();
        const group2 = new THREE.Group();

        // Meshes
        const mesh1 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        group1.add(mesh1);

        const mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        group2.add(mesh2);

        group1.position.set(-2, 0, 0);
        group2.position.set(2, 0, 0);

        scene.add(group1);
        scene.add(group2);

        // Zoom to group function
        const zoomToGroup = (group: THREE.Group) => {
            const box = new THREE.Box3().setFromObject(group);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3()).length();

            const distance = size * 2;
            camera.position.set(center.x, center.y, center.z + distance);
            camera.lookAt(center);
            controls.target.copy(center);
        };

        // Check and zoom to selected detail
        useEffect(() => {
            if (selectedDetail === 'group1') {
                zoomToGroup(group1);
            } else if (selectedDetail === 'group2') {
                zoomToGroup(group2);
            }
        }, [selectedDetail]);

        // Animation
        const tick = () => {
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };

        tick();

        // Resize listener
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Clean up on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            controls.dispose();
            renderer.dispose();
        };
    }, [selectedDetail]);

    const details = [
        { id: 'group1', label: 'Group 1', color: '#ff0000' },
        { id: 'group2', label: 'Group 2', color: '#00ff00' }
    ];

    return (
        <motion.div className="detail-picker">
            <motion.div className="canvas-container">
                <canvas ref={canvasRef} className="webgl"></canvas>
            </motion.div>

            <motion.div className="detail-picker-options">
                {details.map(({ id, label, color }) => (
                    <motion.div
                        key={id}
                        onClick={() => onDetailChange(id)}
                        className={clsx(
                            'detail-picker-option',
                            { 'detail-picker-option--selected': selectedDetail === id }
                        )}
                        style={{ backgroundColor: color }}
                    >
                        {label}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default DetailPickerComponent;
