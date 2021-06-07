import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF, OrbitControls, useTexture, Loader } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import * as THREE from 'three';
import m3d from 'assets/3d-models/moi_mem.glb';
import whiteImg from 'assets/images/white-img.jpg';
import 'assets/scss/scss-pages/customize-lure.scss';
import TabSelectCustomize from 'components/tab-select-customize/TabSelectCustomize';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getMaterialsInfoBy, getNodesInfoBy, getMaterialsName } from 'utils/product';
import { setListName } from 'redux/action/customize-name';

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
// const state = proxy({
// 	current: null,
// 	items: {
// 		laces: '#ffffff',
// 		mesh: '#ffffff',
// 		caps: '#ffffff',
// 		inner: '#ffffff',
// 		sole: '#ffffff',
// 		stripes: '#ffffff',
// 		band: '#ffffff',
// 		patch: '#ffffff',
// 	},
// });

function Shoe(props) {
	const ref = useRef();
	const dispatch = props.dispatch;
	// const snap = useSnapshot(state);

	let customizeInfo = props.customizeInfo;
	function getColorMaterialByName(listmaterial, name) {
		if (listmaterial.length > 0) {
			for (const i in listmaterial) {
				const element = listmaterial[i];
				if (element.name === name) return element.color;
			}
		}
		return '';
	}
	console.log(getColorMaterialByName(customizeInfo, 'mesh'));
	// Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
	// { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
	// nodes is a named collection of meshes, materials a named collection of materials
	const { nodes, materials } = useGLTF(m3d);
	console.log(nodes, materials);
	let listNodes = getNodesInfoBy(nodes, 'Mesh');
	let listMaterials = getMaterialsInfoBy(materials, 'MeshStandardMaterial');
	let listMaterialsName = getMaterialsName(materials, 'MeshStandardMaterial');
	useEffect(() => {
		const action = setListName(listMaterialsName);

		dispatch(action);
	}, []);

	let listTextures = [];
	let texture0 = useTexture(
		customizeInfo.length > 0 && customizeInfo[0].img !== '' ? customizeInfo[0].img : whiteImg
	);
	let texture1 = useTexture(
		customizeInfo.length > 0 && customizeInfo[1].img !== '' ? customizeInfo[1].img : whiteImg
	);
	let texture2 = useTexture(customizeInfo.length > 0 && customizeInfo.length > 2 ? customizeInfo[2].img : whiteImg);
	let texture3 = useTexture(customizeInfo.length > 0 && customizeInfo.length > 3 ? customizeInfo[3].img : whiteImg);
	let texture4 = useTexture(customizeInfo.length > 0 && customizeInfo.length > 4 ? customizeInfo[4].img : whiteImg);
	let texture5 = useTexture(customizeInfo.length > 0 && customizeInfo.length > 5 ? customizeInfo[5].img : whiteImg);
	let texture6 = useTexture(customizeInfo.length > 0 && customizeInfo.length > 6 ? customizeInfo[6].img : whiteImg);
	let texture7 = useTexture(customizeInfo.length > 0 && customizeInfo.length > 7 ? customizeInfo[7].img : whiteImg);

	listTextures.push(texture0, texture1, texture2, texture3, texture4, texture5, texture6, texture7);

	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.repeat.set(1, 1);

	// console.log('node', nodes);
	// console.log('materials', materials);
	// Animate model
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
		ref.current.rotation.x = Math.cos(t / 4) / 8;
		ref.current.rotation.y = Math.sin(t / 4) / 8;
		ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
	});

	// Cursor showing current color
	const [hovered, set] = useState(null);
	useEffect(() => {
		const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${getColorMaterialByName(
			customizeInfo,
			hovered
		)}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
		const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
		document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`;
	}, [hovered]);

	// Using the GLTFJSX output here to wire in app-state and hook up events
	return (
		<group
			ref={ref}
			dispose={null}
			onPointerOver={(e) => {
				e.stopPropagation();
				console.log(e.object);
				set(e.object.material.name);
			}}
			onPointerOut={(e) => e.intersections.length === 0 && set(null)}
			onPointerMissed={() => {
				// state.current = null;
				set(null);
			}}
			onPointerDown={(e) => {
				e.stopPropagation();
				// state.current = e.object.material.name;
			}}
		>
			{listNodes &&
				listNodes.map((item, i) => (
					<mesh
						key={i}
						receiveShadow
						castShadow
						geometry={item.geometry}
						material={listMaterials[i].mesh}
						material-map={listTextures[i]}
						material-color={customizeInfo.length > 0 ? customizeInfo[i].color : '#ffffff'}
					/>
				))}
		</group>
	);
}

// function Picker() {
// 	const snap = useSnapshot(state);
// 	return (
// 		<div style={{ display: snap.current ? 'block' : 'none' }}>
// 			<HexColorPicker
// 				className="picker"
// 				color={snap.items[snap.current]}
// 				onChange={(color) => (state.items[snap.current] = color)}
// 			/>
// 			<h1>{snap.current}</h1>
// 		</div>
// 	);
// }

function CanvasModel(props) {
	return (
		<div className="customize">
			<Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
				<ambientLight intensity={0.7} />
				<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
				<Suspense fallback={null}>
					<Shoe
						dispatch={props.dispatch}
						customizeInfo={props.customizeInfo}
						imgLinkSole={props.imgLinkSole}
						color={props.color}
					/>
					<Environment preset="city" />
					<ContactShadows
						rotation-x={Math.PI / 2}
						position={[0, -0.8, 0]}
						opacity={0.25}
						width={10}
						height={10}
						blur={1.5}
						far={0.8}
					/>
				</Suspense>
				<OrbitControls />
			</Canvas>
			<Loader />
			{/* <Picker /> */}
		</div>
	);
}

export default function Customize() {
	const customizeInfo = useSelector((state) => state.customizeName);
	const imgLinkSole = useSelector((state) => state.customizeImg.sole);

	const color = useSelector((state) => state.customizeColor);
	const dispatch = useDispatch();

	return (
		<div className="row">
			<div className="col-md-3">
				{' '}
				<TabSelectCustomize />
			</div>
			<div className="col-md-6">
				{' '}
				<CanvasModel
					dispatch={dispatch}
					customizeInfo={customizeInfo}
					imgLinkSole={imgLinkSole}
					color={color}
				/>{' '}
			</div>
		</div>
	);
}
