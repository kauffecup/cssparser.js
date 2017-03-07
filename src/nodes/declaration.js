class QualifiedRule extends CSSObject {
    getType() {
        return 'QUALIFIED_RULE'
    }

    toSimpleJSON() {
        return {
            selectors: toSimple(this.get('selectors')),
            declarations: toSimple(this.get('value'))
        }
    }

    static create(value) {
        return new QualifiedRule()
            .set('value', value)
    }
}

class Declaration extends CSSObject {
    getType() {
        return 'DECLARATION'
    }

    toSimpleJSON() {
        var json = {}
        json[toSimple(this.get('property'))] = toSimple(this.get('value'))

        return json
    }

    static create(property, value) {
        return new Declaration()
            .set('property', property)
            .set('value', value)
    }
}

class DeclarationList extends CSSObject {
    getType() {
        return 'DECLARATION_LIST'
    }

    toSimpleJSON() {
        var json = {}
        
        toSimple(this.get('value')).map((o) => {
            mixin(json, o)
        })

        return json
    }

    static create(value) {
        return new DeclarationList()
            // force value to array
            .set('value', concat(value, []))
    }
}