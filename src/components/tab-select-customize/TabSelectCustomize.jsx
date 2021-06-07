import React, { useState } from 'react';

import { images, color } from './dumy-data';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setImg, removeImg } from 'redux/action/customize-img';
import { setColor, removeColor } from 'redux/action/customize-color';
import YLButton from 'components/custom-field/YLButton';
import { Link } from 'react-router-dom';
import { setMaterialId } from 'redux/action/customize-id';
import { HexColorPicker } from 'react-colorful';
import { setListName } from 'redux/action/customize-name';

const tablist = [{ name: 'IMG' }, { name: 'Color' }];
function TabSelectCustomize(props) {
	const [tabSelect, setTabSelect] = useState(0);
	const materials = props.customizeName;
	console.log(materials);
	const mId = useSelector((state) => state.customizeId);
	function handleClickTab(i) {
		setTabSelect(i);
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
			<div className="tab-detail">
				<div className="tab-detail-close">X</div>
				<SwitchMaterial materials={materials} mId={mId} />
				<div className="detail">
					<ImgChoices mId={mId} />
					<ColorChoices mId={mId} />
				</div>
			</div>
		</div>
	);
}

function SwitchMaterial(props) {
	let material = props.materials;
	// const mId = useSelector((state) => state.customizeId);
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
		<div className="d-flex">
			<button onClick={() => decreaseMId()}>{'<'}</button>
			<p>{material.length > 0 && material[mId].name}</p>
			<button onClick={() => increaseMId()}>{'>'}</button>
		</div>
	);
}

function ImgChoices(props) {
	const mId = props.mId;
	const imgRedux = useSelector((state) => state.customizeName);

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
		<div className="d-flex flex-column">
			<div className="img-option">
				{mId === 1 || mId === 4 ? (
					images.map((value, index) => (
						<img
							src={`${value}`}
							width={80}
							height={80}
							key={index}
							onClick={() => handleChangeImg(value)}
						/>
					))
				) : (
					<span>Bộ phận không hỗ trợ sử dụng hình ảnh</span>
				)}
			</div>
			<YLButton variant="negative" type="button" value="Không dùng ảnh" onClick={handleRemoveImg} />
		</div>
	);
}

function ColorChoices(props) {
	const mId = props.mId;
	const dispatch = useDispatch();

	const imgRedux = useSelector((state) => state.customizeName);

	function handleSetColor(color) {
		let list = JSON.parse(JSON.stringify(imgRedux));
		list[mId].color = color;
		let action = setListName(list);
		dispatch(action);
	}
	function handleRemoveColor() {
		let list = JSON.parse(JSON.stringify(imgRedux));
		list[mId].color = '#fff';
		let action = setListName(list);
		dispatch(action);
	}
	return (
		<div className="d-flex flex-column">
			<div className="color-option">
				{color.map((value, index) => (
					<Link style={{ background: value }} key={index} onClick={() => handleSetColor(value)} />
				))}
			</div>
			<HexColorPicker className="color-option-picker" onChange={(color) => handleSetColor(color)} />
			<YLButton variant="negative" value="Không màu" onClick={handleRemoveColor} />
		</div>
	);
}
const mapStateToProps = (state) => ({ customizeName: state.customizeName });
export default connect(mapStateToProps)(TabSelectCustomize);
