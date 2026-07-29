// mascara para apresentar no form
export function formatPhone(phone?: string | null) {

    if (!phone) return "-";

    const numbers = phone.replace(/\D/g, "");

    if (numbers.length === 11) {

        return numbers.replace(
            /(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
        );

    }

    if (numbers.length === 10) {

        return numbers.replace(
            /(\d{2})(\d{4})(\d{4})/,
            "($1) $2-$3"
        );

    }

    return phone;

}

export function formatDocument(document?: string | null) {

    if (!document) return "-";

    const numbers = document.replace(/\D/g, "");

    if (numbers.length === 11) {

        return numbers.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );

    }

    if (numbers.length === 14) {

        return numbers.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
        );

    }

    return document;

}

// mascara ao digitar no formulario

export function maskPhone(value: string) {

    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 10) {

        return numbers.replace(
            /(\d{0,2})(\d{0,4})(\d{0,4})/,
            (_, ddd, p1, p2) => {

                let result = "";

                if (ddd) result += `(${ddd}`;

                if (ddd.length === 2) result += ") ";

                if (p1) result += p1;

                if (p2) result += "-" + p2;

                return result;

            }
        );

    }

    return numbers.replace(
        /(\d{0,2})(\d{0,5})(\d{0,4})/,
        (_, ddd, p1, p2) => {

            let result = "";

            if (ddd) result += `(${ddd}`;

            if (ddd.length === 2) result += ") ";

            if (p1) result += p1;

            if (p2) result += "-" + p2;

            return result;

        }
    );

}

export function maskDocument(value: string) {

    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 11) {

        return numbers.replace(
            /(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
            (_, a, b, c, d) => {

                let result = a;

                if (b) result += "." + b;

                if (c) result += "." + c;

                if (d) result += "-" + d;

                return result;

            }
        );

    }

    return numbers.replace(
        /(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
        (_, a, b, c, d, e) => {

            let result = a;

            if (b) result += "." + b;

            if (c) result += "." + c;

            if (d) result += "/" + d;

            if (e) result += "-" + e;

            return result;

        }
    );

}

export function formatRole(role: string) {

    switch (role) {

        case "ADMIN":
            return "Administrador";

        case "EMPLOYEE":
            return "Colaborador";

        default:
            return role;

    }

}