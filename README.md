On this site JSON schemas developed by S1Seven for the services provided by [en10204.io](https://en10204.io) are published.

## EN10168

The EN10168.schema.json is an implementation of the European Union steel standards of the same name.

## E-COC

The e-CoC.schema.json is a reimplementation of [e-coc.org schema](https://e-coc.org/schema/v1.0.0/e-coc.json).

Following changes were applied :

- In `TechnicalProperties`.`value` property replace `oneOf` by `anyOf` and adding the following possible type

```json
{
  "type": "array",
  "maxItems": 6,
  "minItems": 1,
  "items": {
    "type": "string"
  }
}
```

- In `EcocData` property references union (`DataLevelA`, `DataLevelB`, `DataLevelC`) replaced by `DataLevel` reference

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "DataLevel": {
      "enum": ["A", "B", "C"]
    },
    "Data": {
      "$ref": "#/definitions/HigherDataLevel"
    },
    "Results": {
      "$ref": "#/definitions/Results"
    }
  },
  "allOf": [
    {
      "if": {
        "properties": { "DataLevel": { "const": "A" } }
      },
      "then": {
        "properties": {
          "Data": { "default": null },
          "Results": { "default": null }
        }
      }
    },
    {
      "if": {
        "properties": { "DataLevel": { "const": "B" } }
      },
      "then": {
        "properties": {
          "Data": { "$ref": "#/definitions/HigherDataLevel" },
          "Results": { "default": null }
        }
      }
    },
    {
      "if": {
        "properties": { "DataLevel": { "const": "C" } }
      },
      "then": {
        "properties": {
          "Data": { "$ref": "#/definitions/HigherDataLevel" },
          "Results": { "$ref": "#/definitions/Results" }
        }
      }
    }
  ],
  "required": ["DataLevel"]
}
```
