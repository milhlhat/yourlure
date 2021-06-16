import React, { useState } from 'react';

import { images, color } from './dumy-data';
import { connect, useDispatch, useSelector } from 'react-redux';
import YLButton from 'components/custom-field/YLButton';
import { Link } from 'react-router-dom';
import { setMaterialId } from 'redux/customize-action/customize-id';
import { HexColorPicker, RgbaColorPicker } from 'react-colorful';
import 'assets/scss/scss-components/customize-lure.scss';
import { setListName } from 'redux/customize-action/customize-info';

function TabSelectCustomize(props) {
	const [tabSelect, setTabSelect] = useState(0);
	const [isOpen, setIsOpisOpen] = useState(true);
	const materials = props.customizeInfo;
	console.log(materials);
	const mId = useSelector((state) => state.customizeId);
	const tablist = [
		{ name: 'IMG', component: <ImgChoices mId={mId} /> },
		{ name: 'Color', component: <ColorChoices mId={mId} /> },
	];
	function handleClickTab(i) {
		setTabSelect(i);
		setIsOpisOpen(true);
	}

	return (
		<div className="tab-custom">
			<div className="tab-menu">
				{tablist.map((tab, i) => (
					<div
						className={`${tabSelect === i ? 'selected' : ''} texture-action`}
						key={i}
						onClick={() => handleClickTab(i)}
					>
						{tab.name}
					</div>
				))}
				<div className="texture-action"></div>
			</div>
			<div className={`tab-detail ${!isOpen ? 'd-none' : ''}`}>
				<div className="tab-detail-close pointer p-0 m-0">
					<i onClick={() => setIsOpisOpen(false)} className={`fa fa-times-circle `}></i>
				</div>

				<SwitchMaterial materials={materials} mId={mId} />
				{/* tab-detail */}
				{isOpen && <div className="detail">{tablist[tabSelect].component}</div>}
			</div>
		</div>
	);
}

function SwitchMaterial(props) {
	let material = props.materials;
	const mId = props.mId;
	const dispatch = useDispatch();
	function decreaseMId() {
		let m = mId <= 0 ? material.length - 1 : mId - 1;
		const action = setMaterialId(m);
		dispatch(action);
	}
	function increaseMId() {
		let m = mId >= material.length - 1 ? 0 : mId + 1;
		const action = setMaterialId(m);
		dispatch(action);
	}
	return (
		<div className="d-flex align-items-center justify-content-center switch">
			<button className="border-0 bg-transparent pointer switch-button" onClick={() => decreaseMId()}>
				<i className="fa fa-angle-left"></i>
			</button>
			<span className="mx-3">{material.length > 0 && material[mId] && material[mId].name}</span>
			<button className="border-0 bg-transparent pointer switch-button" onClick={() => increaseMId()}>
				<i className="fa fa-angle-right"></i>
			</button>
		</div>
	);
}

function ImgChoices(props) {
	const mId = props.mId;
	const imgRedux = useSelector((state) => state.customizeInfo);

	const dispatch = useDispatch();
	function handleChangeImg(imgLink) {
		let list = JSON.parse(JSON.stringify(imgRedux));
		list[mId].img = imgLink;
		let action = setListName(list);
		dispatch(action);
	}
	function handleRemoveImg() {
		let list = JSON.parse(JSON.stringify(imgRedux));
		list[mId].img = '';
		let action = setListName(list);
		dispatch(action);
	}
	return (
		<div className="d-flex flex-column ">
			{imgRedux.length > 0 && imgRedux[mId] && imgRedux[mId].canAddImg ? (
				<>
					<div className="img-option">
						{images.map((item, i) => (
							<img src={item} key={i} width={50} height={50} onClick={() => handleChangeImg(item)} />
						))}
					</div>
					<div className="d-flex flex-column mt-3 align-items-center">
						{/* <YLButton variant="negative" type="button" value="Không dùng ảnh" onClick={handleRemoveImg} /> */}
						<hr className="hr my-3" />
						{/* <YLButton variant="primary" type="button" value="Upload ảnh" disabled /> */}
					</div>
				</>
			) : (
				<span>Bộ phận không hỗ trợ sử dụng hình ảnh</span>
			)}
		</div>
	);
}

function ColorChoices(props) {
	const mId = props.mId;
	const dispatch = useDispatch();

	const imgRedux = useSelector((state) => state.customizeInfo);

	function handleSetColor(color) {
		let list = JSON.parse(JSON.stringify(imgRedux));
		list[mId].color = color;
		let action = setListName(list);
		dispatch(action);
	}
	function handleRemoveColor() {
		let list = JSON.parse(JSON.stringify(imgRedux));
		list[mId].color = '';
		let action = setListName(list);
		dispatch(action);
	}
	return (
		<div className="d-flex flex-column ">
			{imgRedux.length > 0 && imgRedux[mId] && imgRedux[mId].canAddColor ? (
				<>
					<div className="color-option">
						{color.map((value, index) => (
							<Link style={{ background: value }} key={index} onClick={() => handleSetColor(value)} />
						))}
					</div>
					<HexColorPicker className="color-option-picker" onChange={(color) => handleSetColor(color)} />
					<div className="text-center mt-3">
						<YLButton variant="negative" value="Không màu" onClick={handleRemoveColor} />
					</div>
				</>
			) : (
				<span>Bộ phận không hỗ trợ sử dụng màu</span>
			)}
		</div>
	);
}
const mapStateToProps = (state) => ({ customizeInfo: state.customizeInfo });
export default connect(mapStateToProps)(TabSelectCustomize);
