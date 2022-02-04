import React, {useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Liquidity from './components/Liquidity/Liquidity';
import LiquidityAdd from './components/Liquidity/Add/LiquidityAdd';
import LiquidityPage from './pages/LiquidityPage';
import SwapPage from './pages/SwapPage';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
    faWallet,
    faCogs,
    faSyncAlt,
    faArrowDown,
    faChevronDown,
    faChevronLeft,
    faArrowUp,
    faChevronUp,
    faSearch,
    faQuestionCircle,
    faPlus,
    faMinus,
    faExchangeAlt
} from '@fortawesome/free-solid-svg-icons'
import {faQuestionCircle as farQuestionCircle} from '@fortawesome/free-regular-svg-icons';
import SettingsModal from './components/SettingsModal/SettingsModal';
import {useTypedSelector} from './hooks/useTypedSelector';
import {useActions} from './hooks/useActions';
import BridgesPage from './pages/BridgesPage';

library.add(fab, faWallet, faCogs, faSyncAlt, faArrowDown, faChevronDown, faChevronLeft, faArrowUp, faChevronUp, faQuestionCircle, farQuestionCircle, faSearch, faPlus, faMinus, faExchangeAlt)


const App = () => {
    const settings = useTypedSelector(state => state.settings)
    const {setSettingsModalOpened} = useActions()

    return (
        <Layout>
            <Routes>
                <Route path="/swap" element={<SwapPage />} />
                <Route path="/liquidity" element={<LiquidityPage />}>
                    <Route index element={<Liquidity />} />
                    <Route path="add" element={<LiquidityAdd />} />
                </Route>
                <Route path="/bridges" element={<BridgesPage />} />
                <Route path="*" element={<Navigate to="/swap" />}/>
            </Routes>

            <SettingsModal isOpen={settings.is_modal_opened} onRequestClose={() => setSettingsModalOpened(false)}/>
        </Layout>
    );
};

export default App;