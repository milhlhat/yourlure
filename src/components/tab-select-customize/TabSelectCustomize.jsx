import React, { useState } from 'react';

import { images, color } from './dumy-data';
import { useDispatch, useSelector } from 'react-redux';
import { setImg, removeImg } from 'redux/action/customize-img';
import { setColor, removeColor } from 'redux/action/customize-color';
import YLButton from 'components/custom-field/YLButton';
import { Link } from 'react-router-dom';
import { setMaterialId } from 'redux/action/customize-id';
import { HexColorPicker } from 'react-colorful';

const tablist = [{ name: 'IMG' }, { name: 'Color' }];
function TabSelectCustomize(props) {
	const [tabSelect, setTabSelect] = useState(0);
	const materials = ['laces', 'mesh', 'caps', 'inner', 'sole', 'stripes', 'band', 'patch'];

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
					{tabSelect === 0 && <ImgChoices mId={mId} />}
					{tabSelect === 1 && <ColorChoices mId={mId} />}
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
			<p>{material[mId]}</p>
			<button onClick={() => increaseMId()}>{'>'}</button>
		</div>
	);
}

function ImgChoices(props) {
	const mId = props.mId;
	const imgRedux = useSelector((state) => state.customizeImg);

	const dispatch = useDispatch();
	function handleChangeImg(imgLink) {
		let action = null;
		if (mId === 4) {
			action = setImg({ ...imgRedux, sole: imgLink });
		} else if (mId === 1) {
			action = setImg({ ...imgRedux, mesh: imgLink });
		} else return;

		dispatch(action);
	}
	function handleRemoveImg() {
		let action = null;
		if (mId === 4) {
			action = removeImg({ ...imgRedux, sole: null });
		} else if (mId === 1) {
			action = removeImg({ ...imgRedux, mesh: '' });
		} else return;
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
			<YLButton variant="negative" type='button' value="Không dùng ảnh" onClick={handleRemoveImg} />
		</div>
	);
}

function ColorChoices(props) {
	const mId = props.mId;
	const colorRedux = useSelector((state) => state.customizeColor);
	const dispatch = useDispatch();

	let colorChoose = { ...colorRedux };
	function handleSetColor(color) {
		switch (mId) {
			case 0:
				colorChoose = { ...colorRedux, laces: color };
				break;

			case 1:
				colorChoose = { ...colorRedux, mesh: color };
				break;

			case 2:
				colorChoose = { ...colorRedux, caps: color };
				break;

			case 3:
				colorChoose = { ...colorRedux, inner: color };
				break;

			case 4:
				colorChoose = { ...colorRedux, sole: color };
				break;

			case 5:
				colorChoose = { ...colorRedux, stripes: color };
				break;

			case 6:
				colorChoose = { ...colorRedux, band: color };
				break;
			case 7:
				colorChoose = { ...colorRedux, patch: color };
				break;
			default:
				return;
		}
		const action = setColor(colorChoose);
		dispatch(action);
	}
	function handleRemoveColor() {
		switch (mId) {
			case 0:
				colorChoose = { ...colorRedux, laces: '#ffffff' };
				break;

			case 1:
				colorChoose = { ...colorRedux, mesh: '#ffffff' };
				break;

			case 2:
				colorChoose = { ...colorRedux, caps: '#ffffff' };
				break;

			case 3:
				colorChoose = { ...colorRedux, inner: '#ffffff' };
				break;

			case 4:
				colorChoose = { ...colorRedux, sole: '#ffffff' };
				break;

			case 5:
				colorChoose = { ...colorRedux, stripes: '#ffffff' };
				break;

			case 6:
				colorChoose = { ...colorRedux, band: '#ffffff' };
				break;
			case 7:
				colorChoose = { ...colorRedux, patch: '#ffffff' };
				break;
			default:
				return;
		}
		const action = setColor(colorChoose);
		dispatch(action);
	}
	return (
		<div className="d-flex flex-column">
			<div className="color-option">
				{color.map((value, index) => (
					<Link style={{ background: value }} key={index} onClick={() => handleSetColor(value)} />
				))}
				
			</div>
			<HexColorPicker
				className="color-option-picker"
				 
				onChange={(color) =>  handleSetColor(color)}
			/>
			<YLButton variant="negative" value="Không màu" onClick={handleRemoveColor} />
		</div>
	);
}
export default TabSelectCustomize;
