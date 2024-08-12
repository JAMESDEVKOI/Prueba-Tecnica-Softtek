export function MapKeysTranslate(mapping: Record<string, string>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const result = await originalMethod.apply(this, args);


            if (Array.isArray(result.body)) {
                result.body = result.body.map((item: any) =>
                    translateKeys(item, mapping)
                );
            } else {

                result.body = translateKeys(result.body, mapping);
            }

            return result;
        };

        return descriptor;
    };
}

function translateKeys(obj: any, mapping: Record<string, string>) {
    const translatedObj: any = {};
    for (const key of Object.keys(obj)) {
        const translatedKey = mapping[key] || key;
        translatedObj[translatedKey] = obj[key];
    }
    return translatedObj;
}
