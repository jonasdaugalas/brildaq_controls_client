import { Configuration } from '@app/shared/models/configuration';


export function customConfigSortFn(a: Configuration, b: Configuration) {
    let aGroup = a.path.split('/')[1];
    let bGroup = b.path.split('/')[1];
    // 'central' goes first against others
    if (aGroup === 'central' && bGroup !== 'central') {
        return -1;
    } else if (bGroup === 'central' && aGroup !== 'central') {
        return 1;
    // 'dip' goes first against others except 'central'
    } else if (aGroup === 'dip' && bGroup !== 'dip') {
        return -1;
    } else if (bGroup === 'dip' && aGroup !== 'dip') {
        return 1;
    // otherwise sort alphabetically (case sensitive is OK - doesn't matter)
    } else if (a.path < b.path) {
        return -1;
    } else if (b.path < a.path) {
        return 1;
    }
    return 0;
}
