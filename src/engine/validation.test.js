import { listAllFields, listAllPredicates } from "./validation";

test("Two field rule ", () => {
  const rules = {
    password: {
      when: { firstName: "empty" },
      action: "remove"
    },
    telephone: [
      {
        when: { age: { greater: 10 } },
        action: "require"
      },
      {
        when: { age: { less: 20 } },
        action: "hide"
      }
    ]
  };

  let predicates = listAllPredicates(rules);
  expect(predicates).toEqual(new Set(["empty", "greater", "less"]));

  let fields = listAllFields(rules);
  expect(fields).toEqual(new Set(["firstName", "age", "password", "telephone"]));
});

test("3 field rule ", () => {

  const rules = {
    password: {
      when: { firstName: "empty" },
      action: "remove",
    },
    telephone: [
      {
        when: { age: { greater: 10 } },
        action: "require",
      },
      { when: { age: { less: 20 } } }
    ],
    lastName: {
      when: { firstName: "empty" },
      action: "hide",
    }
  };

  let predicates = listAllPredicates(rules);
  expect(predicates).toEqual(new Set(["empty", "greater", "less"]));

  let fields = listAllFields(rules);
  expect(fields).toEqual(new Set(["firstName", "age", "password", "telephone", "lastName"]));

});