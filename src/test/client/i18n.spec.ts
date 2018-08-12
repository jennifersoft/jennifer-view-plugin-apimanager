import i18n from '../../main/client/i18n'

describe("Simple expression tests", () => {
    test("Check literal value", () => {
        expect(i18n.get('ui.en.externalcall')).toBe('External Call');
    });
});