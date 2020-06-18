import {
  Canvas,
  PanelsContainer,
  ZoomControl,
  PanelLayoutContainer,
  ControlsContainer
} from '@sunpower/panel-layout-tool'
import React from 'react'
import { useStore } from 'react-redux'
import { useI18n } from 'shared/i18n'
import { either } from 'shared/utils'

const PanelLayoutTool = ({
  controls,
  footer,
  step,
  step_name,
  instruction,
  err,
  onClick,
  panels,
  Container
}) => {
  const t = useI18n()
  const store = useStore()

  return (
    <div className={'plt-screen-container'}>
      <h1 className="is-uppercase has-text-centered is-size-6">
        {t('PANEL_LAYOUT_DESIGNER')}
      </h1>
      <div className="step">
        <span className="step-number">{step}/2</span>
        <span className="step-name"> {step_name}</span>
      </div>
      {either(
        err,
        <span className="has-text-centered has-error-text is-size-7">
          {t(err)}
        </span>,
        <span className="has-text-centered has-text-white is-size-7">
          {instruction}
        </span>
      )}
      <div className="canvas">
        <PanelLayoutContainer>
          <Canvas
            store={store}
            width={window.innerWidth - 30}
            height={window.innerWidth - 30}
            onClick={onClick}
          >
            {Container ? (
              <Container PanelComponent={panels} />
            ) : (
              <PanelsContainer PanelComponent={panels} />
            )}
          </Canvas>
          <ControlsContainer
            center={controls}
            right={<ZoomControl step={0.5} min={1} max={3} />}
          />
        </PanelLayoutContainer>
      </div>
      {footer}
    </div>
  )
}
export default PanelLayoutTool
