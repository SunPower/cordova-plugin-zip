import { createAction } from 'redux-act'

export const PLT_LOAD = createAction('Panel layout tool: LOAD from pvs')
export const PLT_LOAD_FINISHED = createAction('Panel layout tool: loaded')
export const PLT_LOAD_ERROR = createAction(
  'Panel layout tool: Error on load from pvs'
)
export const PLT_SAVE = createAction('Panel layout tool: Save to pvs')
export const PLT_SAVE_ERROR = createAction(
  'Panel layout tool: Error on save to pvs'
)

export const PLT_SAVE_FINISHED = createAction('Panel layout tool: saved')
export const PLT_MARK_AS_CHANGED = createAction('Panel layout tool: changed')
export const PLT_LAST_MODIFIED_DATE = createAction(
  'Panel Layout tool: set last Modified date'
)
