import React, {useEffect, useState} from 'react';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';
import Modal from '../Modal/Modal';
import styles from './SwapModal.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

type props = {
    isOpen: boolean,
    onRequestClose: () => void
};

const SettingsModal = ({isOpen, onRequestClose}: props) => {
    const settings = useTypedSelector(state => state.settings)
    const {setSlippage} = useActions()
    const slippages = [0.1, 0.5, 1.0, 3.0]
    const [customSlippageValue, setCustomSlippageValue] = useState(() => {
        if (slippages.indexOf(settings.slippage) === -1) {
            return settings.slippage.toFixed(1).toString()
        } else {
            return ''
        }
    })

    // useEffect(() => {
    //     if (slippages.indexOf(slippage) === -1) {
    //         setCustomSlippageValue(slippage.toFixed(1).toString())
    //     } else {
    //         setCustomSlippageValue('')
    //     }
    // }, [])

    const slippageOnClick = (value: number) => {
        setSlippage(value)
        setCustomSlippageValue('')
    }

    const customSlippageChanged = (value: string) => {
        if (/^(([0-9]{1,2}[.,]{1}[0-9]*)|([0-9]{1,2}))$/ig.test(value)) {
            setCustomSlippageValue(value)
            if (/\.$/ig.test(value)) value = value.substr(0, value.length - 1)
            setSlippage(Number(value))
        } else if (value === '') {
            slippageOnClick(1)
        }
    }

    return (
        <Modal title="Settings" isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className={styles.setting}>
                <div className={styles.title}>
                    Slippage tolerance <FontAwesomeIcon icon={['far', 'question-circle']}
                                                        data-tip="Your transaction will revert if the price changes <br>unfavorably by more than this percentage"/>
                </div>
                <div className={styles.selectSlippage}>
                    {slippages.map((value, i) =>
                        <div
                            className={[styles.slippage, value === settings.slippage ? styles.selectedSlippage : ''].join(' ')}
                            onClick={() => slippageOnClick(value)}
                            key={i}>
                            {value.toFixed(1) + '%'}
                        </div>
                    )}
                    <div className={styles.customSlippage}>
                        <input type="text"
                               className={Number(customSlippageValue) === settings.slippage && slippages.indexOf(settings.slippage) === -1 ? styles.selectedSlippage : ''}
                               value={customSlippageValue}
                               placeholder="Custom"
                               onChange={(e) => customSlippageChanged(e.target.value)}/>
                        <span>%</span>
                    </div>
                </div>
            </div>

            <ReactTooltip place="bottom" effect="solid" html={true}/>
        </Modal>
    );
};

export default SettingsModal;