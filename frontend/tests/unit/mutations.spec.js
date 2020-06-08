import { expect } from 'chai'
import { mutations } from '../../src/store'

const { setMisID } = mutations

describe('mutations', () => {
    it('setMisID', () => {
        const state = {
            aktMission: {
                einsatzID: 0
            }
        }

        setMisID(state,123)

        expect(state.aktMission.einsatzID).to.equal(123)
    })
})