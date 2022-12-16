import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { v4 as uuid } from 'uuid';
import { GetColorName } from 'hex-color-to-color-name';


const LogGraphic = ({classifications_list, remarks_list, samples_list, water_list}) => {

  const styles = StyleSheet.create({
    main_container: {
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 4,
      backgroundColor: 'white',
      margin: '3%',
      marginBottom: '1%',
      padding: '1%',
      borderRadius: 10,
    },
    classification_col: {
      flexDirection: 'column',
      flex: 2,
    },
    classification_box: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ruler_col: {
      flexDirection: 'column',
      maxWidth: '3%',
      flex: 2,
      padding: '0%'
    },
    ruler_box: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    water_col: {
      flexDirection: 'column',
      flex: 1,
    },
    water_box: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    description_col: {
      flexDirection: 'column',
      paddingLeft: '3%',
      flex: 6,
    },
    description_box: {
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    remarks_col: {
      flexDirection: 'column',
      paddingLeft: '3%',
      flex: 4,
    },
    remark_box: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    samples_col: {
      flexDirection: 'column',
      paddingLeft: '3%',
      flex: 1,
    },
    sample_box: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    sample_description_col: {
      flexDirection: 'column',
      paddingLeft: '1%',
      flex: 3,
    },
    sample_description_box: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      alignContent: 'flex-start',
    },
  })

  const uscs_colormap = {
    'NONE': { box: 'white', text: 'white'},
    'CH': { box: '#F4F4F4', text: 'black'},
    'CL': { box: '#EBEBEB', text: 'black'},
    'CL-ML': { box: '#DFDFDF', text: 'black'},
    'GC': { box: '#D1D1D1', text: 'black'},
    'GC-GM': { box: '#C7C7C7', text: 'black'},
    'GM': { box: '#DFDFDF', text: 'black'},
    'GP': { box: '#BBBBBB', text: 'black'},
    'GP-GC': { box: '#AFAFAF', text: 'black'},
    'GP-GM': { box: '#A5A5A5', text: 'black'},
    'GW': { box: '#9C9C9C', text: 'black'},
    'GW-GC': { box: '#939393', text: 'black'},
    'GW-GM': { box: '#8B8B8B', text: 'black'},
    'ML': { box: '#838383', text: 'black'},
    'SC': { box: '#6D6D6D', text: 'black'},
    'SC-SM': { box: '#676767', text: 'white'},
    'SM': { box: '#5F5F5F', text: 'white'},
    'SP': { box: '#595959', text: 'white'},
    'SP-SC': { box: '#505050', text: 'white'},
    'SP-SM': { box: '#444444', text: 'white'},
    'SW': { box: '#3B3B3B', text: 'white'},
    'SW-SC': { box: '#2F2F2F', text: 'white'},
    'SW-SM': { box: '#252525', text: 'white'},
    'OH': { box: '#1B1B1B', text: 'white'},
    'OL': { box: '#0F0F0F', text: 'white'},
    'PT': { box: '#000000', text: 'white'},
  }

  // takes info from classification to generate text for description box
  function generate_description (classification: classification) {
    let output  = "";

    if (classification.color) {
      output = output + GetColorName(classification.color) + ", ";
    }

    if (classification.moisture) {
      output = output + classification.moisture + ", ";
    }

    if (classification.density) {
      output = output + classification.density + ", ";
    }

    if (classification.hardness) {
      output = output + classification.hardness + " ";
    }

    return output;

  }

  function grammar (text: string) {
    let output = text;
    output = output.toLowerCase();
    output = output.charAt(0).toUpperCase() + output.slice(1);

    return output;
  }

  function get_final_depth (classifications: classification[]) {
    if(classifications.length == 0) return;

    classifications.sort(compareDepths);
    const bottom = classifications[classifications.length - 1].end_depth;

    return bottom + bottom % 5 - 1;

  }

  let make_water_box = function (code: number) {

    if (code == 0){
      return <View style={[styles.water_box, {flex: 1}]} key={uuid()} ><Text></Text></View>
    }

    else if (code == 1) {
      return <View style={[styles.water_box, {flex: 1}]} key={uuid()} ><Text>&#9660;</Text></View>
    }

    else if (code == 2) {
      return <View style={[styles.water_box, {flex: 1}]} key={uuid()} ><Text>&#9661;</Text></View>
    }

  };

  let make_uscs_box = function (classification: classification) {
    const length = classification.end_depth - classification.start_depth;
    const boxColor = uscs_colormap[classification.uscs] ? uscs_colormap[classification.uscs]['box'] : 'white';
    const textColor = uscs_colormap[classification.uscs] ? uscs_colormap[classification.uscs]['text'] : 'white';
    return <View key={uuid()} style={[styles.classification_box, {flex: length, backgroundColor: boxColor }]} ><Text style={{color: textColor}}>{classification.uscs}</Text></View>
  };

  let make_description_box = function (classification: classification) {
    const length = classification.end_depth - classification.start_depth;
    let description = generate_description(classification)
    description = grammar(description)
    if (classification.uscs) {
      description = classification.uscs + ": " + description;
    }
    return <View key={uuid()} style={[styles.description_box, {flex: length}]} ><Text numberOfLines={length}>{description}</Text></View>
  };

  let make_remark_box = function (remark: remark) {
    const length = 1;
    let text  = ""
    if (remark.notes) {
      text = remark.notes + " @" + remark.start_depth + "'";
    }
    return <View key={uuid()} style={[styles.remark_box, {flex: length}]} ><Text numberOfLines={length}>{text}</Text></View>
  };

  let make_sample_box = function (sample: sample) {
    const length = sample.length;
    let color = ""
    if (sample.blows_1) {
      color = "black";
    }
    else {
      color = "white";
    }
    return <View key={uuid()} style={[styles.sample_box, {flex: length, backgroundColor: color }]} ><Text></Text></View>
  };

  let make_sample_description_box = function (sample: sample) {
    const length = sample.length;
    let text = ""
    if (sample.blows_1) {
      text = String(sample.blows_1);
    }
    if (sample.blows_2) {
      text = text + "-" + sample.blows_2;
    }
    if (sample.blows_3) {
      text = text + "-" + sample.blows_3;
    }
    if (sample.blows_4) {
      text = text + "-" + sample.blows_4;
    }
    return <View key={uuid()} style={[styles.sample_description_box, {flex: length}]} ><Text style={{color: "black"}}>{text}</Text></View>
  };

  function compareDepths(classification_a: classification, classification_b: classification) {
    return classification_a.start_depth - classification_b.start_depth;
  }

  function compareRemarkDepths(remark_a: remark, remark_b: remark) {
    return remark_a.start_depth - remark_b.start_depth;
  }

  function compareSampleDepths(sample_a: sample, sample_b: sample) {
    return sample_a.start_depth - sample_b.start_depth;
  }

  let make_uscs_boxes = function (classifications: classification[]) {
    if(classifications.length == 0) return <Text>No Data</Text>;

    const classificationsCopy  = [...classifications];

    classificationsCopy.sort(compareDepths);

    for(let i = 0; i < classificationsCopy.length; i++) {
      let classification = classificationsCopy[i];

      if(i == 0) {
        // insert blank box when first classification starts deeper than 0'
        if(classification.start_depth != 0) {
          let emptyClassification = {"color": "white", "createdAt": "", "density": "", "end_depth": classification.start_depth, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": 0, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": "NONE"}
          classificationsCopy.splice(0, 0, emptyClassification);
        }
      }
      // insert blank box when there's a gap between this classification and the next one
      if(i < classificationsCopy.length - 1) {
        if(classification.end_depth < classificationsCopy[i+1].start_depth) {
          let emptyClassification = {"color": "white", "createdAt": "", "density": "", "end_depth": classificationsCopy[i+1].start_depth, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": classification.end_depth, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": "NONE"}
          classificationsCopy.splice(i+1, 0, emptyClassification);
        }
      }
    }

    // insert blank box at end to make final depth a multiple of 5
    let bottom = classificationsCopy[classificationsCopy.length - 1].end_depth;
    if(bottom % 5 != 0) {
      let diff = 5 - bottom % 5
      let emptyClassification = {"color": "white", "createdAt": "", "density": "", "end_depth": bottom + diff, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": bottom, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": "NONE"}
      classificationsCopy.splice(classificationsCopy.length, 0, emptyClassification);
    }
    const uscs_boxes = classificationsCopy.map((classification) =>
      make_uscs_box(classification)
    );

    return uscs_boxes
  }

  let make_description_boxes = function (classifications: classification[]) {
    if(classifications.length == 0) return <Text>No Data</Text>;

    const classificationsCopy  = [...classifications];

    classificationsCopy.sort(compareDepths);

    for(let i = 0; i < classificationsCopy.length; i++) {
      let classification = classificationsCopy[i];

      if(i == 0) {
        // insert blank box when first classification starts deeper than 0'
        if(classification.start_depth != 0) {
          let emptyClassification = {"color": "", "createdAt": "", "density": "", "end_depth": classification.start_depth, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": 0, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": ""}
          classificationsCopy.splice(0, 0, emptyClassification);
        }
      }
      // insert blank box when there's a gap between this classification and the next one
      if(i < classificationsCopy.length - 1) {
        if(classification.end_depth < classificationsCopy[i+1].start_depth) {
          let emptyClassification = {"color": "", "createdAt": "", "density": "", "end_depth": classificationsCopy[i+1].start_depth, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": classification.end_depth, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": ""}
          classificationsCopy.splice(i+1, 0, emptyClassification);
        }
      }
    }

    // insert blank box at end to make final depth a multiple of 5
    let bottom = classificationsCopy[classificationsCopy.length - 1].end_depth;
    if(bottom % 5 != 0) {
      let diff = 5 - bottom % 5
      let emptyClassification = {"color": "", "createdAt": "", "density": "", "end_depth": bottom + diff, "hardness": "", "id": 3, "log_id": 2, "moisture": "", "start_depth": bottom, "updatedAt": "2022-11-30T07:32:13.127Z", "uscs": ""}
      classificationsCopy.splice(classificationsCopy.length, 0, emptyClassification);
    }

    const description_boxes = classificationsCopy.map((classification) =>
      make_description_box(classification)
    );

    return description_boxes
  }

  let make_remark_boxes = function (remarks: remark[], final_depth: number) {
    if(remarks.length == 0) return <Text>No Data</Text>;

    const remarksCopy  = [...remarks];

    remarksCopy.sort(compareRemarkDepths);

    for(let i = 0; i < remarksCopy.length; i++) {
      let remark = remarksCopy[i];

      if(i == 0) {
        // insert blank box when first classification starts deeper than 0'
        if(remark.start_depth != 0) {
          for (let j = 0; j < remark.start_depth; j++){
            let emptyRemark = {"remark_id": 1, "log_id": 2, "start_depth": j, "notes": ""}
            remarksCopy.splice(j, 0, emptyRemark);
          }
        }
      }
      // insert blank box when there's a gap between this classification and the next one
      if(i < remarksCopy.length - 1) {
        if((remark.start_depth + 1) < remarksCopy[i+1].start_depth) {
          for (let j = remark.start_depth + 1; j < remarksCopy[i+1].start_depth; j++) {
            let emptyRemark = {"remark_id": 1, "log_id": 2, "start_depth": j, "notes": ""}
            remarksCopy.splice(j, 0, emptyRemark);
          }
        }
      }
    }

    // insert blank box at end to make final depth a multiple of 5
    let bottom = remarksCopy[remarksCopy.length - 1].start_depth + 1;
    if(bottom < final_depth) {
      for (let j = bottom; j < final_depth; j++) {
        let emptyRemark = {"remark_id": 1, "log_id": 2, "start_depth": j, "notes": ""}
        remarksCopy.splice(j, 0, emptyRemark);
      }
    }

    const remark_boxes = remarksCopy.map((remark) =>
      make_remark_box(remark)
    );

    return remark_boxes
  }

  let make_sample_boxes = function (samples: sample[], final_depth: number) {
    if(samples.length == 0) return <Text>No Data</Text>;

    const samplesCopy  = [...samples];

    samplesCopy.sort(compareSampleDepths);

    for(let i = 0; i < samplesCopy.length; i++) {
      let sample = samplesCopy[i];

      if(i == 0) {
        // insert blank box when first classification starts deeper than 0'
        if(sample.start_depth != 0) {
          let emptySample = {"id": "", "log_id": "", "start_depth": 0, "length": sample.start_depth * 12, "blows_1": "", "blows_2": "", "blows 3": "", "blows_4": "", "description": "", "refusal_length": "", "sampler_type": ""}
          samplesCopy.splice(0, 0, emptySample);
        }
      }
      // insert blank box when there's a gap between this classification and the next one
      if(i < samplesCopy.length - 1) {
        if((sample.start_depth + (sample.length / 12)) < samplesCopy[i+1].start_depth) {
          let distance = samplesCopy[i+1].start_depth * 12;
          distance = distance - (sample.start_depth * 12);
          distance = distance - sample.length;
          let emptySample = {"id": "", "log_id": "", "start_depth": sample.start_depth + (sample.length/12), "length": distance, "blows_1": "", "blows_2": "", "blows 3": "", "blows_4": "", "description": "", "refusal_length": "", "sampler_type": ""}
          samplesCopy.splice(i+1, 0, emptySample);
        }
      }
    }

    // insert blank box at end to make final depth a multiple of 5
    let bottom = (samplesCopy[samplesCopy.length - 1].start_depth * 12) + samplesCopy[samplesCopy.length - 1].length;
    if(bottom < final_depth * 12) {
      let distance = final_depth * 12;
      distance = distance - samplesCopy[samplesCopy.length - 1].start_depth * 12;
      distance = distance - samplesCopy[samplesCopy.length - 1].length;

      let emptySample = {"id": "", "log_id": "", "start_depth": bottom / 12 + (samplesCopy[samplesCopy.length - 1].length/12), "length": distance, "blows_1": "", "blows_2": "", "blows 3": "", "blows_4": "", "description": "", "refusal_length": "", "sampler_type": ""}
      samplesCopy.splice(samplesCopy.length, 0, emptySample);
    }

    const sample_boxes = samplesCopy.map((sample) =>
      make_sample_box(sample)
    );

    return sample_boxes
  }

  let make_sample_description_boxes = function (samples: sample[], final_depth: number) {
    if(samples.length == 0) return <Text>No Data</Text>;

    const samplesCopy  = [...samples];

    samplesCopy.sort(compareSampleDepths);

    for(let i = 0; i < samplesCopy.length; i++) {
      let sample = samplesCopy[i];

      if(i == 0) {
        // insert blank box when first classification starts deeper than 0'
        if(sample.start_depth != 0) {
          let emptySample = {"id": "", "log_id": "", "start_depth": 0, "length": sample.start_depth * 12, "blows_1": "", "blows_2": "", "blows 3": "", "blows_4": "", "description": "", "refusal_length": "", "sampler_type": ""}
          samplesCopy.splice(0, 0, emptySample);
        }
      }
      // insert blank box when there's a gap between this classification and the next one
      if(i < samplesCopy.length - 1) {
        if((sample.start_depth + (sample.length / 12)) < samplesCopy[i+1].start_depth) {
          let distance = samplesCopy[i+1].start_depth * 12;
          distance = distance - (sample.start_depth * 12);
          distance = distance - sample.length;
          let emptySample = {"id": "", "log_id": "", "start_depth": sample.start_depth + (sample.length/12), "length": distance, "blows_1": "", "blows_2": "", "blows 3": "", "blows_4": "", "description": "", "refusal_length": "", "sampler_type": ""}
          samplesCopy.splice(i+1, 0, emptySample);
        }
      }
    }

    // insert blank box at end to make final depth a multiple of 5
    let bottom = (samplesCopy[samplesCopy.length - 1].start_depth * 12) + samplesCopy[samplesCopy.length - 1].length;
    if(bottom < final_depth * 12) {
      let distance = final_depth * 12;
      distance = distance - samplesCopy[samplesCopy.length - 1].start_depth * 12;
      distance = distance - samplesCopy[samplesCopy.length - 1].length;
      let emptySample = {"id": "", "log_id": "", "start_depth": bottom / 12 + (samplesCopy[samplesCopy.length - 1].length/12), "length": distance, "blows_1": "", "blows_2": "", "blows 3": "", "blows_4": "", "description": "", "refusal_length": "", "sampler_type": ""}
      samplesCopy.splice(samplesCopy.length, 0, emptySample);
    }

    const sample_description_boxes = samplesCopy.map((sample) =>
      make_sample_description_box(sample)
    );

    return sample_description_boxes
  }

  let make_water_boxes = function (waters: water, final_depth: number) {

    let water = waters;

    let water_depths = [];

    if (water.start_depth_1) {
      water_depths.splice(0, 0, water.start_depth_1);
    }

    if (water.start_depth_2) {
      water_depths.splice(1, 0, water.start_depth_2);
    }

    if (water.start_depth_3) {
      water_depths.splice(2, 0, water.start_depth_3);
    }

    if (water_depths.length == 0) return

    water_depths = water_depths.sort()

    let graphics = [];

    let encounter_counter = 1;

    for (let i = 0; i < final_depth; i++) {
      if (water_depths.indexOf(i) >= 0) {
        graphics.splice(i-1, 0, encounter_counter);
        encounter_counter++;
      }
      else {
        graphics.splice(i, 0, 0)
      }
    }

    const water_boxes = graphics.map((depth) =>
      make_water_box(depth)
    );

    return water_boxes;

  }

  let make_ruler_boxes = function (classifications: classification[]) {
    if(classifications.length == 0) return;

    classifications.sort(compareDepths);

    const bottom = classifications[classifications.length - 1].end_depth;
    const numboxes = Math.ceil(bottom/5);

    let depths = new Array(numboxes);
    for (let i = 0; i < depths.length; i++) {
      depths[i] = i * 5;
    }

    const ruler_boxes = depths.map((depth) =>
      <View style={[styles.ruler_box, {flex: 5}]} key={uuid()} ><Text>{depth}'</Text></View>
    );

    return ruler_boxes
  }


  let deepest_remark = 0;
  for(let i = 0; i < remarks_list.length; i++) {
    if(remarks_list[i].start_depth > deepest_remark) deepest_remark = remarks_list[i].start_depth;
  }
  let deepest_sample = 0;
  for(let i = 0; i < samples_list.length; i++) {
    if(samples_list[i].start_depth > deepest_sample) deepest_sample = samples_list[i].start_depth;
  }
  let deepest_entry = Math.max(Number(get_final_depth(classifications_list)), deepest_remark, deepest_sample, water_list.start_depth_1, water_list.start_depth_2, water_list.start_depth_3)
  
  if(deepest_entry > 75) {
    return (
      <View style={[styles.main_container, {flex: 1, paddingLeft: '6%', paddingTop: '6%', paddingBottom: '2%'}]}>
        <Text style={{ color: 'red', fontWeight: '600', fontSize: '24', marginBottom: '2%'}}>Graphic Unavailable</Text>
        <Text style={{ fontWeight: '400', fontSize: '20'}}>Graphic cannot be displayed on tablet for borings with data beyond 75' below surface.</Text>
      </View>
    )
  }
  else {
    return (
      <View style={[styles.main_container, {flexDirection: 'row', flex: 1, paddingLeft: '2.5%', paddingTop: '6%', paddingBottom: '2%'}]}>
        <View style={[styles.ruler_col]}>
          <Text style={{flex: 1}}></Text>
          {make_ruler_boxes(classifications_list)}
        </View>
        <View style={[styles.water_col]}>
          <Text style={{flex: 1}}></Text>
          {make_water_boxes(water_list, get_final_depth(classifications_list))}
        </View>
        <View style={[styles.classification_col]}>
          <Text style={{flex: 1, fontWeight: 'bold', textAlign: 'center'}}>USCS</Text>
          {make_uscs_boxes(classifications_list)}
        </View>
        <View style={[styles.description_col]}>
          <Text style={{flex: 1, fontWeight: 'bold', textAlign: 'left'}}>Visual Classification</Text>
          {make_description_boxes(classifications_list)}
        </View>
        <View
          style = {{
            borderLeftColor: 'black',
            borderLeftWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={[styles.remarks_col]}>
          <Text style={{flex: 1, fontWeight: 'bold', textAlign: 'center'}}>Remarks</Text>
          {make_remark_boxes(remarks_list, get_final_depth(classifications_list))}
        </View>
        <View
          style = {{
            borderLeftColor: 'black',
            borderLeftWidth: StyleSheet.hairlineWidth,
          }}
        />
        <View style={[styles.samples_col]}>
          <Text style={{flex: 12}}></Text>
          {make_sample_boxes(samples_list, get_final_depth(classifications_list))}
        </View>
        <View style={[styles.sample_description_col]}>
          <Text style={{flex: 12, fontWeight: 'bold', textAlign: 'left'}}>Samples</Text>
          {make_sample_description_boxes(samples_list, get_final_depth(classifications_list))}
        </View>
      </View>
    )
  }
}

export default LogGraphic
