export class ehApi {
    static get(data) {
        const pending = [];

        while (data.length > 0) {
            const reqData = data.splice(0, 25);
            const requestBody = {
                method: "gdata",
                gidlist: reqData,
                namespace: 1
            };

            pending.push(this.fetch(JSON.stringify(requestBody)));
        }

        return pending;
    }

    static async fetch(requestBody) {
        const res = await fetch("https://api.e-hentai.org/api.php", {
            method: "post",
            body: requestBody
        });
        const res_1 = await res.json();
        const gs = res_1.gmetadata;
        return gs.map(data => data.tags).map(tags => tags.filter(tag => tag.startsWith('language:') && !tag.endsWith('translated')));
    }
}