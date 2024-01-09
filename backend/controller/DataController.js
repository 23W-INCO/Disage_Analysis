const axios = require("axios");

const getData = async (req, res) => {
  const { disease } = req.params;
  let newarray = [];
  await axios(`${process.env.BaseUrl}/Condition/_history?_count=500`)
    .then((ress) => {
    
      newarray = ress.data.entry.filter(
        (item) => item.resource?.code?.coding[0].display === disease
      );
    })
    .catch((err) => {
      console.log(err);
    });


  let disease_data = [];

  const overall_data = [
    { ageRange: "10-20", value: 0 },
    { ageRange: "21-40", value: 0 },
    { ageRange: "41-60", value: 0 },
    { ageRange: "61-80", value: 0 },
    { ageRange: "81-100", value: 0 },
    { ageRange: "100-150", value: 0 },
  ];
  const male_data = [
    { ageRange: "10-20", value: 0 },
    { ageRange: "21-40", value: 0 },
    { ageRange: "41-60", value: 0 },
    { ageRange: "61-80", value: 0 },
    { ageRange: "81-100", value: 0 },
    { ageRange: "100-150", value: 0 },
  ];

  const female_data = [
    { ageRange: "10-20", value: 0 },
    { ageRange: "21-40", value: 0 },
    { ageRange: "41-60", value: 0 },
    { ageRange: "61-80", value: 0 },
    { ageRange: "81-100", value: 0 },
    { ageRange: "100-150", value: 0 },
  ];

  for (let i = 0; i < newarray.length; i++) {
    // console.log(newarray[i].resource.subject);
    await axios
      .get(`${process.env.BaseUrl}${newarray[i].resource?.subject?.reference}`)
      .then((res) => {
        // console.log(res.data);
        let patient_Data = {
          name: res.data.name,
          gender: res.data.gender,
          dateOFbirth: res.data.birthDate,
          address: res.data.address,
        };
        disease_data.push(patient_Data);

        var dob = new Date(res.data.birthDate);
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);

        // console.log(age);
        function overallUpdateValueForNumber(number) {
          // Find the range that the number belongs to
          const matchingRange = overall_data.find((entry) => {
            const [min, max] = entry.ageRange.split("-").map(Number);
            return number >= min && (number <= max || !max);
          });

          // If a matching range is found, increment its value
          if (matchingRange) {
            matchingRange.value += 1;
            console.log(
              `Number ${number} belongs to range ${matchingRange.range}. Updated value: ${matchingRange.value}`
            );
          } else {
            console.log(
              `Number ${number} does not belong to any defined range.`
            );
          }
        }
        overallUpdateValueForNumber(age);

        if (res.data.gender == "male") {
          function maleUpdateValueForNumber(number) {
            // Find the range that the number belongs to
            const matchingRange = male_data.find((entry) => {
              const [min, max] = entry.ageRange.split("-").map(Number);
              return number >= min && (number <= max || !max);
            });

            // If a matching range is found, increment its value
            if (matchingRange) {
              matchingRange.value += 1;
              console.log(
                `Number ${number} belongs to range ${matchingRange.range}. Updated value: ${matchingRange.value}`
              );
            } else {
              console.log(
                `Number ${number} does not belong to any defined range.`
              );
            }
          }
          maleUpdateValueForNumber(age);
        } else if (res.data.gender == "female") {
          function femaleUpdateValueForNumber(number) {
            // Find the range that the number belongs to
            const matchingRange = female_data.find((entry) => {
              const [min, max] = entry.ageRange.split("-").map(Number);
              return number >= min && (number <= max || !max);
            });

            // If a matching range is found, increment its value
            if (matchingRange) {
              matchingRange.value += 1;
              console.log(
                `Number ${number} belongs to range ${matchingRange.range}. Updated value: ${matchingRange.value}`
              );
            } else {
              console.log(
                `Number ${number} does not belong to any defined range.`
              );
            }
          }
          femaleUpdateValueForNumber(age);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // console.log(overall_data);

  res.json({ overall_data, male_data, female_data });
};

module.exports = getData;
