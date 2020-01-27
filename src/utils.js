export const parseLink = link => {
    const gid = parseInt(link.split("/")[4]);
    const token = link.split("/")[5];
    return [gid, token];
};

export const parseCountryCode = language => {
    return {
        'japanese': 'JP',
        'english': 'GB',
        'chinese': 'CN',
        'dutch': 'NL',
        'french': 'FR',
        'german': 'DE',
        'hungarian': 'HU',
        'italian': 'IT',
        'korean': 'KR',
        'polish': 'PL',
        'portuguese': 'PT',
        'russian': 'RU',
        'spanish': 'ES',
        'thai': 'TH',
        'vietnamese': 'VN'
    }[language];
}