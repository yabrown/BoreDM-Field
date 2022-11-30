interface project  {
    id:         number
    name:       string
    client:     string
    location:   string
    notes:      string
  }

  interface project_wo_id  {
    name:       string
    client:     string
    location:   string
    notes:      string
  }

  interface log  {
    project_id: number
    id:     number
    name:       string
    driller: string
    logger:  string
    notes:      string
  }

  interface log_wo_id  {
    project_id: number
    name:       string
    driller: string
    logger:  string
    notes:      string
  }

  interface sample {
    log_id:         number
    sample_id:      number
    start_depth:    number
    end_depth:      number
    length:         number
    blows_1:        number
    blows_2:        number
    blows_3:        number
    blows_4:        number
    description:    string
    refusal_length: number
    sampler_type:   string
  }

  interface sample_wo_id {
    log_id:         number
    start_depth:    number
    length:         number
    blows_1:        number
    blows_2:        number
    blows_3:        number
    blows_4:        number
    description:    string
    refusal_length: number
    sampler_type:   string
  }

  type RootStackParamList = {
    Home: undefined;
    Project: { project: project, onUpdate};
    Log:     {log: log, updateLogList}
  };

  type LoginStackParamList = {
    Login: undefined;
    Register: undefined;
  };

  interface classification {
      log_id:         number
      start_depth:    number
      end_depth:      number,
      uscs:           string,
      color:          string,
      moisture:       string,
      density:        string,
      hardness:       string,
    };

  type user = null | {
    name: string,
    username: string
  }